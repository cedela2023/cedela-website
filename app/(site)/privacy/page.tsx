import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How CEDELA collects, uses and protects personal data.", path: "/privacy" });

export default function PrivacyPage() {
  return <LegalPage slug="privacy" />;
}
