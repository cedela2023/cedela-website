"use server";

import { headers } from "next/headers";
import { acknowledgementTemplate, escapeHtml, FROM, internalTemplate, resend, route } from "@/lib/email";
import { formSchemas, newsletterSchema, type FormKind, type FormState } from "@/lib/forms";

/* ------------------------------------------------------------------ */
/* Abuse protection: honeypot, minimum fill time and a light rate     */
/* limit. For high traffic, move the limiter to Upstash or similar.   */
/* ------------------------------------------------------------------ */

const hits = new Map<string, number[]>();

async function guard(formData: FormData): Promise<FormState | null> {
  if (String(formData.get("company_website") ?? "").length > 0) {
    // Bots fill hidden fields. Pretend it worked.
    return { status: "success", message: "Thank you. Your message has been received." };
  }
  const started = Number(formData.get("_t") ?? 0);
  if (started && Date.now() - started < 2500) {
    return { status: "error", message: "That was quick. Please review the form and try again." };
  }
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 8) {
    return { status: "error", message: "Too many submissions. Please wait a few minutes or email info@cedelatechpark.ng." };
  }
  hits.set(ip, [...recent, now]);
  return null;
}

function fieldErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const errors: Record<string, string> = {};
  for (const i of issues) {
    const key = String(i.path[0] ?? "form");
    if (!errors[key]) errors[key] = i.message;
  }
  return errors;
}

function reference(prefix: string) {
  const d = new Date();
  const stamp = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

type Mail = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
};

async function send(mail: Mail) {
  if (!resend) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email:dev] RESEND_API_KEY not set. Would send "${mail.subject}" to ${mail.to}`);
      return { ok: true };
    }
    console.error("[email] RESEND_API_KEY is not configured");
    return { ok: false };
  }
  const { error } = await resend.emails.send({ from: FROM, ...mail });
  if (error) console.error("[email] send failed:", error);
  return { ok: !error };
}

/* ------------------------------------------------------------------ */
/* Per-form behaviour                                                  */
/* ------------------------------------------------------------------ */

const labels: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  organization: "Organization",
  role: "Role",
  enquiryType: "Enquiry type",
  interest: "Area of interest",
  preferredDate: "Preferred date",
  partnershipType: "Partnership type",
  website: "Website",
  investorType: "Investor type",
  package: "Package",
  platform: "Platform",
  position: "Position",
  linkedin: "LinkedIn",
  incidentType: "Incident type",
  severity: "Severity",
  ongoing: "Still ongoing",
  detectedAt: "Detected at",
  systems: "Affected systems",
  message: "Message",
};

const enquiryRouting = {
  general: "general",
  business: "business",
  media: "media",
  careers: "careers",
  partnership: "partnerships",
  investor: "investors",
} as const;

const config: Record<
  FormKind,
  {
    subject: (d: Record<string, string | undefined>, ref: string) => string;
    inbox: (d: Record<string, string | undefined>) => Parameters<typeof route>[0];
    ack: (d: Record<string, string | undefined>, ref: string) => { heading: string; paragraphs: string[] };
    success: (ref: string) => string;
    refPrefix: string;
  }
> = {
  contact: {
    refPrefix: "ENQ",
    subject: (d, ref) => `New ${d.enquiryType} enquiry from ${d.name} [${ref}]`,
    inbox: (d) => enquiryRouting[(d.enquiryType as keyof typeof enquiryRouting) ?? "general"] ?? "general",
    ack: (_d, ref) => ({
      heading: "We have received your message",
      paragraphs: [
        "Thank you for contacting CEDELA. A member of our team will review your enquiry and respond within one business day.",
        `Your reference is <strong>${ref}</strong>.`,
      ],
    }),
    success: () => "Thank you. Your message is with our team and we will reply within one business day.",
  },
  consultation: {
    refPrefix: "CON",
    subject: (d, ref) => `Consultation request: ${d.interest} from ${d.organization} [${ref}]`,
    inbox: () => "business",
    ack: (d, ref) => ({
      heading: "Your consultation request",
      paragraphs: [
        `Thank you for your interest in ${escapeHtml(d.interest)}. One of our consultants will contact you shortly to agree a convenient time.`,
        `Your reference is <strong>${ref}</strong>.`,
      ],
    }),
    success: () => "Thank you. A consultant will be in touch shortly to arrange your session.",
  },
  partnership: {
    refPrefix: "PTN",
    subject: (d, ref) => `Partnership enquiry (${d.partnershipType}) from ${d.organization} [${ref}]`,
    inbox: () => "partnerships",
    ack: () => ({
      heading: "Thank you for reaching out",
      paragraphs: ["We appreciate your interest in partnering with CEDELA. Our partnerships team will review your proposal and respond soon."],
    }),
    success: () => "Thank you. Our partnerships team will review your proposal and be in touch.",
  },
  investor: {
    refPrefix: "INV",
    subject: (d, ref) => `Investor information request from ${d.organization} [${ref}]`,
    inbox: () => "investors",
    ack: () => ({
      heading: "Investor information request",
      paragraphs: ["Thank you for your interest in CEDELA. Our investor relations team will share the Investor Information Memorandum when it is available and follow up with you directly."],
    }),
    success: () => "Thank you. Our investor relations team will contact you directly.",
  },
  portalAccess: {
    refPrefix: "PRT",
    subject: (d, ref) => `Client portal access request: ${d.organization} [${ref}]`,
    inbox: () => "general",
    ack: () => ({
      heading: "Portal access request",
      paragraphs: ["We have received your request for client portal access. Your engagement manager will verify your details and send secure sign-in instructions."],
    }),
    success: () => "Request received. Your engagement manager will send secure sign-in instructions after verification.",
  },
  demo: {
    refPrefix: "DEM",
    subject: (d, ref) => `iRES demonstration request from ${d.organization} [${ref}]`,
    inbox: () => "business",
    ack: () => ({
      heading: "Your iRES demonstration",
      paragraphs: ["Thank you for your interest in iRES. A member of our cybersecurity team will contact you to schedule a tailored demonstration."],
    }),
    success: () => "Thank you. Our cybersecurity team will contact you to schedule your demonstration.",
  },
  platformInterest: {
    refPrefix: "PLT",
    subject: (d, ref) => `Early access interest: ${d.platform} from ${d.organization} [${ref}]`,
    inbox: () => "business",
    ack: (d) => ({
      heading: "You are on the list",
      paragraphs: [`Thank you for registering interest in the ${escapeHtml(d.platform)}. We will keep you informed about early access and launch updates.`],
    }),
    success: () => "Thank you. We will keep you updated on early access.",
  },
  profile: {
    refPrefix: "PRF",
    subject: (d, ref) => `Corporate profile request from ${d.name} [${ref}]`,
    inbox: () => "business",
    ack: () => ({
      heading: "Your copy of our corporate profile",
      paragraphs: ["Thank you for your interest in CEDELA. Our team will send you the latest edition of our corporate profile shortly."],
    }),
    success: () => "Thank you. We will email you the latest corporate profile shortly.",
  },
  application: {
    refPrefix: "APP",
    subject: (d, ref) => `Application: ${d.position} from ${d.name} [${ref}]`,
    inbox: () => "careers",
    ack: (d, ref) => ({
      heading: "Thank you for your application",
      paragraphs: [
        `We have received your application for <strong>${escapeHtml(d.position)}</strong>. Our talent team reviews every application carefully and will contact shortlisted candidates.`,
        `Your reference is <strong>${ref}</strong>.`,
      ],
    }),
    success: () => "Application received. Thank you for your interest in joining CEDELA.",
  },
  incident: {
    refPrefix: "IRES",
    subject: (d, ref) => `[${(d.severity ?? "").toUpperCase()}] iRES incident report: ${d.incidentType} at ${d.organization} [${ref}]`,
    inbox: () => "incidents",
    ack: (_d, ref) => ({
      heading: "Incident report received",
      paragraphs: [
        `Your incident has been logged with reference <strong>${ref}</strong>. An iRES incident handler will contact you on the phone number you provided.`,
        "While you wait: isolate affected systems from the network without powering them off, preserve logs and evidence, avoid contacting the attackers, and use a trusted channel for internal communication.",
        "For critical incidents, call <strong>+234 915 795 1812</strong> immediately.",
      ],
    }),
    success: (ref) => `Incident logged. Reference ${ref}. An iRES handler will call you shortly.`,
  },
};

const MAX_CV_BYTES = 4 * 1024 * 1024;
const CV_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export async function submitForm(kind: FormKind, _prev: FormState, formData: FormData): Promise<FormState> {
  const blocked = await guard(formData);
  if (blocked) return blocked;

  const schema = formSchemas[kind];
  if (!schema) return { status: "error", message: "Unknown form." };

  const raw = Object.fromEntries([...formData.entries()].filter(([k, v]) => !k.startsWith("$") && typeof v === "string"));
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: "Please check the highlighted fields.", errors: fieldErrors(parsed.error.issues) };
  }
  const data = parsed.data as Record<string, string | undefined>;

  let attachments: Mail["attachments"];
  if (kind === "application") {
    const cv = formData.get("cv");
    if (!(cv instanceof File) || cv.size === 0) return { status: "error", message: "Please attach your CV.", errors: { cv: "Please attach your CV" } };
    if (cv.size > MAX_CV_BYTES) return { status: "error", message: "Your CV must be smaller than 4 MB.", errors: { cv: "File must be smaller than 4 MB" } };
    if (cv.type && !CV_TYPES.includes(cv.type)) return { status: "error", message: "Please upload a PDF or Word document.", errors: { cv: "PDF or Word documents only" } };
    attachments = [{ filename: cv.name.replace(/[^\w.\- ]/g, "_"), content: Buffer.from(await cv.arrayBuffer()) }];
  }

  const c = config[kind];
  const ref = reference(c.refPrefix);
  const fields = Object.entries(data)
    .filter(([k]) => k !== "consent")
    .map(([k, v]) => [labels[k] ?? k, v] as [string, unknown]);

  const internal = await send({
    to: route(c.inbox(data)),
    subject: c.subject(data, ref),
    replyTo: data.email,
    html: internalTemplate(
      c.subject(data, ref).replace(/ \[.*\]$/, ""),
      [["Reference", ref], ...fields],
      kind === "incident"
        ? { text: `${data.severity} severity`, color: data.severity === "critical" || data.severity === "high" ? "#e5484d" : "#0a1bc4" }
        : undefined,
    ),
    attachments,
  });

  if (!internal.ok) {
    return {
      status: "error",
      message:
        kind === "incident"
          ? "We could not submit your report online. Please call +234 915 795 1812 now."
          : "Something went wrong sending your message. Please try again or email info@cedelatechpark.ng.",
    };
  }

  const ack = c.ack(data, ref);
  // Acknowledgement failures should not fail the submission
  await send({ to: data.email!, subject: `${ack.heading} | CEDELA`, html: acknowledgementTemplate(data.name ?? "there", ack.heading, ack.paragraphs) });

  return { status: "success", message: c.success(ref), reference: ref };
}

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const blocked = await guard(formData);
  if (blocked) return blocked;
  const parsed = newsletterSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { status: "error", message: "Please enter a valid email address.", errors: { email: "Invalid email" } };

  const { email } = parsed.data;
  if (resend) {
    const segment = process.env.RESEND_SEGMENT_ID;
    const { error } = await resend.contacts.create({ email, unsubscribed: false, ...(segment ? { segments: [{ id: segment }] } : {}) });
    if (error && !/already exists/i.test(error.message)) {
      console.error("[newsletter] contact create failed:", error);
      return { status: "error", message: "We could not subscribe you right now. Please try again shortly." };
    }
  } else if (process.env.NODE_ENV !== "production") {
    console.info(`[newsletter:dev] Would subscribe ${email}`);
  } else {
    return { status: "error", message: "Subscriptions are temporarily unavailable." };
  }
  return { status: "success", message: "You are subscribed. Look out for our next insights briefing." };
}
