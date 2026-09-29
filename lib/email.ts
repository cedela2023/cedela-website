import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
export const resend = apiKey ? new Resend(apiKey) : null;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.cedelatechpark.ng").replace(/\/$/, "");

export const FROM = process.env.RESEND_FROM_EMAIL || "CEDELA Website <onboarding@resend.dev>";

/** Inbox routing. Every recipient falls back to the general inbox. */
export const inbox = {
  general: process.env.CONTACT_INBOX || "info@cedelatechpark.ng",
  business: process.env.BUSINESS_INBOX,
  media: process.env.MEDIA_INBOX,
  careers: process.env.CAREERS_INBOX,
  investors: process.env.INVESTORS_INBOX,
  partnerships: process.env.PARTNERSHIPS_INBOX,
  incidents: process.env.IRES_INBOX,
};

export function route(key: keyof typeof inbox) {
  return inbox[key] || inbox.general;
}

const esc = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const shell = (inner: string, preheader = "") => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CEDELA</title></head>
<body style="margin:0;background:#f5f8fc;font-family:Calibri,'Segoe UI',Arial,sans-serif;color:#16192e;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8fc;padding:32px 12px">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #dfe5f0">
<tr><td style="background:#08123f;padding:26px 32px">
<img src="${SITE_URL}/logo/cedela-logo-white.png" width="168" height="30" alt="CEDELA" style="display:block;border:0;height:30px;width:168px">
</td></tr>
<tr><td style="padding:32px">${inner}</td></tr>
<tr><td style="padding:20px 32px;background:#eaf7fe;font-size:12px;color:#5f6480;line-height:1.6">
CEDELA Tech Park Solutions Ltd. · Plot 1606 Oka Akoko Close, Garki II, Abuja · 5th Floor, Skywater Tower, Ikeja, Lagos<br>
Empowering Organizations. Securing the Future. Transforming Africa.
</td></tr>
</table></td></tr></table></body></html>`;

export function internalTemplate(title: string, fields: [string, unknown][], badge?: { text: string; color: string }) {
  const rows = fields
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([k, v]) => `<tr>
<td style="padding:10px 0;border-bottom:1px solid #eef1f7;width:34%;vertical-align:top;font-size:13px;color:#5f6480">${esc(k)}</td>
<td style="padding:10px 0;border-bottom:1px solid #eef1f7;font-size:15px;color:#16192e;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");
  const badgeHtml = badge
    ? `<span style="display:inline-block;margin-bottom:14px;padding:5px 12px;border-radius:999px;background:${badge.color};color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">${esc(badge.text)}</span>`
    : "";
  return shell(
    `${badgeHtml}<h1 style="margin:0 0 20px;font-family:Cambria,Georgia,serif;font-size:24px;color:#16192e">${esc(title)}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
<p style="margin:24px 0 0;font-size:12px;color:#5f6480">Sent from the CEDELA website on ${new Date().toUTCString()}.</p>`,
    title,
  );
}

export function acknowledgementTemplate(name: string, heading: string, paragraphs: string[]) {
  return shell(
    `<h1 style="margin:0 0 18px;font-family:Cambria,Georgia,serif;font-size:24px;color:#16192e">${esc(heading)}</h1>
<p style="margin:0 0 14px;font-size:16px;line-height:1.65">Dear ${esc(name)},</p>
${paragraphs.map((p) => `<p style="margin:0 0 14px;font-size:16px;line-height:1.65;color:#3b3f58">${p}</p>`).join("")}
<p style="margin:22px 0 0;font-size:16px;line-height:1.65">Warm regards,<br><strong>The CEDELA Team</strong></p>
<p style="margin:20px 0 0;font-size:13px;color:#5f6480">+234 915 795 1812 · +234 806 322 8775 · info@cedelatechpark.ng</p>`,
    heading,
  );
}

export { esc as escapeHtml };
