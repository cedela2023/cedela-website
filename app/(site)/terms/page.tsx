import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ title: "Terms of Use", description: "Terms governing use of the CEDELA website.", path: "/terms" });

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}
