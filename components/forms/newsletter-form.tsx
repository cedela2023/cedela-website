"use client";

import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { useActionState } from "react";
import { stampRef } from "./stamp";
import { subscribeNewsletter } from "@/lib/actions";
import { initialFormState } from "@/lib/forms";

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, initialFormState);

  if (state.status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 rounded-full bg-white/5 px-5 py-4 text-[0.97rem] text-white ring-1 ring-white/10">
        <CircleCheck className="h-5 w-5 text-sky" /> {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="w-full" noValidate>
      <input type="hidden" name="_t" ref={stampRef} />
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px]" />
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-2 rounded-full bg-white/5 p-1.5 ring-1 ring-white/15 transition focus-within:ring-sky/60">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your work email"
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          aria-label="Subscribe"
          className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-sky px-5 font-semibold text-midnight transition hover:bg-sky-300 disabled:opacity-70"
        >
          {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <>Subscribe <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>}
        </button>
      </div>
      {state.status === "error" && <p className="mt-2 pl-4 text-sm text-[#ff9b9e]">{state.message}</p>}
    </form>
  );
}
