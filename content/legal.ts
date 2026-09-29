import type { SimpleBlock } from "./types";

/**
 * Default legal copy. Have it reviewed by counsel, then manage the final
 * version in Sanity (Legal pages, slug "privacy" or "terms").
 */
export const legalDefaults: Record<"privacy" | "terms", { title: string; updatedAt: string; body: SimpleBlock[] }> = {
  privacy: {
    title: "Privacy Policy",
    updatedAt: "2026-09-26",
    body: [
      { _type: "p", text: "CEDELA Tech Park Solutions Ltd. (\"CEDELA\", \"we\", \"us\") respects your privacy. This policy explains how we collect, use, share and protect personal data when you visit our website, contact us, subscribe to our updates, apply for a role or use our services, in line with the Nigeria Data Protection Act 2023 and other applicable laws." },
      { _type: "h2", text: "Information we collect" },
      { _type: "ul", items: ["Contact details you provide, such as your name, email address, phone number, organization and role.", "The content of enquiries, consultation requests, incident reports and applications, including any CV you upload.", "Technical information such as IP address, browser type and pages visited, collected through cookies and similar technologies.", "Newsletter preferences and communications history."] },
      { _type: "h2", text: "How we use your information" },
      { _type: "ul", items: ["To respond to enquiries and provide the services you request.", "To triage and respond to cyber incidents reported through iRES.", "To assess job applications.", "To send insights and updates you have subscribed to. You can unsubscribe at any time.", "To operate, secure and improve our website.", "To meet legal and regulatory obligations."] },
      { _type: "h2", text: "Lawful basis" },
      { _type: "p", text: "We process personal data on the basis of your consent, the performance of a contract or steps before entering into one, our legitimate interests in operating our business securely, and compliance with legal obligations." },
      { _type: "h2", text: "Sharing your information" },
      { _type: "p", text: "We do not sell personal data. We share it only with trusted service providers who help us operate our website and services, such as hosting, email delivery and content management providers, under appropriate contractual safeguards, or where required by law." },
      { _type: "h2", text: "International transfers" },
      { _type: "p", text: "Some of our service providers may process data outside Nigeria. Where this happens, we take steps to ensure an adequate level of protection in line with applicable law." },
      { _type: "h2", text: "Retention" },
      { _type: "p", text: "We keep personal data only for as long as necessary for the purposes described above, or as required by law." },
      { _type: "h2", text: "Security" },
      { _type: "p", text: "We apply technical and organizational measures appropriate to the risk, including encryption in transit, access controls and monitoring." },
      { _type: "h2", text: "Your rights" },
      { _type: "p", text: "You may request access to, correction or deletion of your personal data, object to or restrict certain processing, withdraw consent and request data portability. To exercise these rights, email info@cedelatechpark.ng. You may also lodge a complaint with the Nigeria Data Protection Commission." },
      { _type: "h2", text: "Cookies" },
      { _type: "p", text: "We use essential cookies to operate the website and, where enabled, analytics cookies to understand how it is used. You can control cookies through your browser settings." },
      { _type: "h2", text: "Contact" },
      { _type: "p", text: "CEDELA Tech Park Solutions Ltd., Plot 1606 Oka Akoko Close, Off Lagos Street, Garki II, Abuja, Nigeria. Email: info@cedelatechpark.ng." },
    ],
  },
  terms: {
    title: "Terms of Use",
    updatedAt: "2026-09-26",
    body: [
      { _type: "p", text: "These terms govern your use of the CEDELA Tech Park Solutions Ltd. website. By using the website you agree to them. If you do not agree, please do not use the website." },
      { _type: "h2", text: "Use of the website" },
      { _type: "p", text: "You may use the website for lawful purposes only. You must not attempt to gain unauthorised access, interfere with its operation, or use it to transmit harmful code or unsolicited communications." },
      { _type: "h2", text: "Information on the website" },
      { _type: "p", text: "Content is provided for general information only and does not constitute professional, legal or security advice. While we aim to keep information accurate and current, we make no warranties about its completeness or suitability for any purpose." },
      { _type: "h2", text: "Incident reporting" },
      { _type: "p", text: "Submitting an incident report through the website does not by itself create a service contract. Response commitments, including target response windows, apply as set out in your iRES service agreement. For critical incidents, call the iRES hotline." },
      { _type: "h2", text: "Intellectual property" },
      { _type: "p", text: "The website and its content, including text, graphics, logos, the CEDELA Transformation Framework and iRES marks, are owned by or licensed to CEDELA and protected by intellectual property laws. You may view and print pages for personal, non-commercial use." },
      { _type: "h2", text: "Third-party links" },
      { _type: "p", text: "The website may link to third-party sites. We are not responsible for their content or practices." },
      { _type: "h2", text: "Limitation of liability" },
      { _type: "p", text: "To the extent permitted by law, CEDELA is not liable for any loss arising from use of, or reliance on, the website or its content." },
      { _type: "h2", text: "Changes" },
      { _type: "p", text: "We may update these terms from time to time. The latest version will always be available on this page." },
      { _type: "h2", text: "Governing law" },
      { _type: "p", text: "These terms are governed by the laws of the Federal Republic of Nigeria." },
      { _type: "h2", text: "Contact" },
      { _type: "p", text: "Questions about these terms can be sent to info@cedelatechpark.ng." },
    ],
  },
};
