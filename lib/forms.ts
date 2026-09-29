import { z } from "zod";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  reference?: string;
};

export const initialFormState: FormState = { status: "idle" };

const name = z.string().trim().min(2, "Please enter your full name").max(120);
const email = z.string().trim().email("Please enter a valid email address").max(160);
const phone = z.string().trim().min(7, "Please enter a valid phone number").max(40);
const optional = (max = 200) => z.string().trim().max(max).optional().or(z.literal("").transform(() => undefined));
const message = (min = 10) => z.string().trim().min(min, `Please tell us a little more (at least ${min} characters)`).max(5000);
const consent = z.literal("on", { message: "Please confirm you agree to our privacy policy" });

export const formSchemas = {
  contact: z.object({
    name,
    email,
    phone: optional(40),
    organization: optional(),
    enquiryType: z.enum(["general", "business", "media", "careers", "partnership", "investor"]),
    message: message(),
    consent,
  }),
  consultation: z.object({
    name,
    email,
    phone,
    organization: z.string().trim().min(2, "Please enter your organization").max(200),
    role: optional(),
    interest: z.string().trim().min(2, "Please choose an area of interest").max(200),
    preferredDate: optional(40),
    message: message(),
    consent,
  }),
  partnership: z.object({
    name,
    email,
    phone: optional(40),
    organization: z.string().trim().min(2, "Please enter your organization").max(200),
    partnershipType: z.string().trim().min(2, "Please choose a partnership type").max(120),
    website: optional(),
    message: message(),
    consent,
  }),
  investor: z.object({
    name,
    email,
    phone: optional(40),
    organization: z.string().trim().min(2, "Please enter your organization").max(200),
    investorType: z.string().trim().min(2, "Please choose an option").max(120),
    message: optional(3000),
    consent,
  }),
  portalAccess: z.object({
    name,
    email,
    phone: optional(40),
    organization: z.string().trim().min(2, "Please enter your organization").max(200),
    message: optional(3000),
    consent,
  }),
  demo: z.object({
    name,
    email,
    phone,
    organization: z.string().trim().min(2, "Please enter your organization").max(200),
    package: optional(60),
    message: optional(3000),
    consent,
  }),
  platformInterest: z.object({
    name,
    email,
    organization: z.string().trim().min(2, "Please enter your organization").max(200),
    platform: z.string().trim().min(2).max(120),
    message: optional(3000),
    consent,
  }),
  profile: z.object({
    name,
    email,
    organization: optional(),
    consent,
  }),
  application: z.object({
    name,
    email,
    phone,
    position: z.string().trim().min(2, "Please choose a position").max(200),
    linkedin: optional(300),
    message: message(30),
    consent,
  }),
  incident: z.object({
    name,
    email,
    phone,
    organization: z.string().trim().min(2, "Please enter your organization").max(200),
    incidentType: z.string().trim().min(2, "Please choose the incident type").max(120),
    severity: z.enum(["critical", "high", "medium", "low"], { message: "Please choose a severity" }),
    ongoing: z.enum(["yes", "no", "unsure"]),
    detectedAt: optional(60),
    systems: optional(1000),
    message: message(20),
    consent,
  }),
} as const;

export type FormKind = keyof typeof formSchemas;

export const newsletterSchema = z.object({ email, consent: z.literal("on").optional() });
