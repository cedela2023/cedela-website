"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="on-dark flex min-h-[80svh] items-center bg-midnight pt-24 text-white">
      <div className="container-x">
        <p className="eyebrow mb-6">Something went wrong</p>
        <h1 className="max-w-2xl text-5xl leading-tight">We hit an unexpected problem loading this page.</h1>
        <p className="mt-5 max-w-xl text-lg text-white/70">Please try again. If it keeps happening, contact info@cedelatechpark.ng.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="sky" onClick={() => reset()}>
            Try again
          </Button>
          <ButtonLink href="/" variant="outline-light">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
