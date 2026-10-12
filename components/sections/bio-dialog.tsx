"use client";

import { X } from "lucide-react";
import { useRef } from "react";

/** "Read full profile" link that opens a team member's complete biography in a modal. */
export function BioDialog({ name, role, bio }: { name: string; role: string; bio: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const paragraphs = bio.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <button type="button" onClick={() => ref.current?.showModal()} className="mt-3 text-[0.95rem] font-semibold text-navy underline-offset-4 hover:underline">
        Read full profile
      </button>
      <dialog
        ref={ref}
        aria-label={name}
        // Clicking the backdrop closes the dialog
        onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-midnight/70 backdrop:backdrop-blur-sm"
      >
        <div data-lenis-prevent className="max-h-[85vh] overflow-y-auto p-8 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl">{name}</h3>
              <p className="mt-1 font-semibold text-navy">{role}</p>
            </div>
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition hover:bg-tint">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-6 space-y-4 text-[1.02rem] leading-relaxed text-muted">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
