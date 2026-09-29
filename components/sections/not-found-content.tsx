import { LogoMark } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";

export function NotFoundContent() {
  return (
    <section className="on-dark grain relative isolate flex min-h-[85svh] items-center overflow-hidden bg-midnight pt-24 text-white">
      <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <LogoMark className="absolute -right-32 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-y-1/2 animate-spin-slow opacity-10" color="#77D4FC" />
      <div className="container-x">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="max-w-3xl text-5xl leading-[1.05] sm:text-7xl">This page has moved on. Let us help you find your way.</h1>
        <p className="mt-6 max-w-xl text-lg text-white/70">The page you are looking for does not exist or may have been relocated.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="sky">
            Back to home
          </ButtonLink>
          <ButtonLink href="/services" variant="outline-light">
            Explore services
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
