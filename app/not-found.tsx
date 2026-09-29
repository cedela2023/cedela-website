import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NotFoundContent } from "@/components/sections/not-found-content";
import { getSiteSettings } from "@/lib/data";

export default async function RootNotFound() {
  const settings = await getSiteSettings();
  return (
    <>
      <Header announcement={null} />
      <main id="main">
        <NotFoundContent />
      </main>
      <Footer settings={settings} />
    </>
  );
}
