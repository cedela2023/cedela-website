"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CircleAlert, CircleCheck, LoaderCircle, Upload } from "lucide-react";
import { createContext, useActionState, useContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { submitForm } from "@/lib/actions";
import { stampRef } from "./stamp";
import { initialFormState, type FormKind, type FormState } from "@/lib/forms";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Ctx = createContext<{ errors?: Record<string, string>; tone: "light" | "dark" }>({ tone: "light" });

export function SmartForm({
  kind,
  children,
  submitLabel = "Send message",
  className,
  tone = "light",
  successTitle = "Thank you",
}: {
  kind: FormKind;
  children: ReactNode;
  submitLabel?: string;
  className?: string;
  tone?: "light" | "dark";
  successTitle?: string;
}) {
  const [state, action] = useActionState<FormState, FormData>(submitForm.bind(null, kind), initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "error" && state.errors) {
      const first = Object.keys(state.errors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }, [state]);

  return (
    <Ctx.Provider value={{ errors: state.status === "error" ? state.errors : undefined, tone }}>
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={cn("rounded-3xl p-8 sm:p-10", tone === "dark" ? "bg-white/5 ring-1 ring-white/10" : "bg-tint")}
            role="status"
            aria-live="polite"
          >
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white"
            >
              <CircleCheck className="h-7 w-7" />
            </motion.span>
            <h3 className={cn("mt-6 text-3xl", tone === "dark" ? "text-white" : "text-ink")}>{successTitle}</h3>
            <p className={cn("mt-3 text-lg", tone === "dark" ? "text-white/75" : "text-muted")}>{state.message}</p>
            {state.reference && (
              <p className={cn("mt-5 inline-flex rounded-full px-4 py-2 font-mono text-sm", tone === "dark" ? "bg-white/10 text-sky" : "bg-white text-navy")}>
                Reference: {state.reference}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            action={action}
            noValidate
            className={cn("grid gap-5", className)}
            exit={{ opacity: 0, y: -8 }}
          >
            <input type="hidden" name="_t" ref={stampRef} />
            <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label>
                Leave this field empty
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            {state.status === "error" && state.message && (
              <div role="alert" className="flex items-start gap-3 rounded-2xl bg-alert/8 p-4 text-[0.97rem] text-alert ring-1 ring-alert/20">
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{state.message}</span>
              </div>
            )}
            {children}
            <SubmitButton label={submitLabel} tone={tone} />
          </motion.form>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

function SubmitButton({ label, tone }: { label: string; tone: "light" | "dark" }) {
  const { pending } = useFormStatus();
  return (
    <div className="pt-2">
      <Button type="submit" size="lg" variant={tone === "dark" ? "sky" : "primary"} arrow={!pending} disabled={pending} className="w-full sm:w-auto">
        {pending ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" /> Sending
          </>
        ) : (
          label
        )}
      </Button>
    </div>
  );
}

function useField(name: string) {
  const { errors, tone } = useContext(Ctx);
  const id = useId();
  return { id, error: errors?.[name], tone };
}

function Label({ htmlFor, children, required, tone }: { htmlFor: string; children: ReactNode; required?: boolean; tone: "light" | "dark" }) {
  return (
    <label htmlFor={htmlFor} className={cn("mb-2 block text-[0.92rem] font-semibold", tone === "dark" ? "text-white/85" : "text-ink")}>
      {children}
      {required ? <span className={cn("ml-0.5", tone === "dark" ? "text-sky" : "text-navy")}>*</span> : <span className="ml-1.5 font-normal text-muted">(optional)</span>}
    </label>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p id={`${id}-error`} className="mt-1.5 text-sm text-alert">
      {error}
    </p>
  ) : null;
}

const darkField = "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-sky focus:ring-sky/15";

export function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
  autoComplete,
  className,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  defaultValue?: string;
}) {
  const { id, error, tone } = useField(name);
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} tone={tone}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn("field", tone === "dark" && darkField)}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function TextArea({ name, label, required, placeholder, rows = 5, className }: { name: string; label: string; required?: boolean; placeholder?: string; rows?: number; className?: string }) {
  const { id, error, tone } = useField(name);
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} tone={tone}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn("field resize-y", tone === "dark" && darkField)}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function Select({
  name,
  label,
  options,
  required,
  placeholder = "Select an option",
  className,
  defaultValue,
}: {
  name: string;
  label: string;
  options: (string | { label: string; value: string })[];
  required?: boolean;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}) {
  const { id, error, tone } = useField(name);
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} tone={tone}>
        {label}
      </Label>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ""}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn("field appearance-none pr-10", tone === "dark" && darkField, tone === "dark" && "[&>option]:text-ink")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => {
            const opt = typeof o === "string" ? { label: o, value: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <svg className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M5.2 7.2a.75.75 0 0 1 1.06.02L10 11.1l3.74-3.88a.75.75 0 1 1 1.08 1.04l-4.28 4.44a.75.75 0 0 1-1.08 0L5.18 8.26a.75.75 0 0 1 .02-1.06Z" />
        </svg>
      </div>
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function RadioGroup({ name, label, options, required, defaultValue }: { name: string; label: string; options: { label: string; value: string; hint?: string }[]; required?: boolean; defaultValue?: string }) {
  const { id, error, tone } = useField(name);
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className={cn("mb-2 block text-[0.92rem] font-semibold", tone === "dark" ? "text-white/85" : "text-ink")}>
        {label}
        {required && <span className="ml-0.5 text-navy">*</span>}
      </legend>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "flex cursor-pointer flex-col rounded-xl border px-4 py-3 text-sm transition has-[:checked]:border-navy has-[:checked]:bg-tint has-[:checked]:ring-2 has-[:checked]:ring-navy/15",
              tone === "dark" ? "border-white/15" : "border-line bg-white",
            )}
          >
            <input type="radio" name={name} value={o.value} defaultChecked={defaultValue === o.value} className="sr-only" />
            <span className="font-semibold">{o.label}</span>
            {o.hint && <span className="mt-0.5 text-xs text-muted">{o.hint}</span>}
          </label>
        ))}
      </div>
      <ErrorText id={id} error={error} />
    </fieldset>
  );
}

export function Consent({ children }: { children?: ReactNode }) {
  const { id, error, tone } = useField("consent");
  return (
    <div>
      <label htmlFor={id} className={cn("flex items-start gap-3 text-[0.94rem]", tone === "dark" ? "text-white/75" : "text-muted")}>
        <input id={id} name="consent" type="checkbox" className="mt-1 h-4 w-4 shrink-0 rounded border-line accent-navy" aria-invalid={!!error} />
        <span>
          {children ?? (
            <>
              I agree to CEDELA processing my information to respond to this request, in line with the{" "}
              <Link href="/privacy" className={cn("font-semibold underline decoration-sky underline-offset-2", tone === "dark" ? "text-sky" : "text-navy")}>
                Privacy Policy
              </Link>
              .
            </>
          )}
        </span>
      </label>
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function FileInput({ name, label, accept, hint }: { name: string; label: string; accept?: string; hint?: string }) {
  const { id, error, tone } = useField(name);
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <div>
      <Label htmlFor={id} required tone={tone}>
        {label}
      </Label>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center gap-4 rounded-xl border border-dashed px-4 py-4 transition hover:border-navy",
          error ? "border-alert" : "border-line",
          tone === "dark" ? "bg-white/5" : "bg-mist",
        )}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-sm">
          <Upload className="h-5 w-5" />
        </span>
        <span className="text-[0.95rem]">
          <span className="block font-semibold">{fileName ?? "Choose a file"}</span>
          {hint && <span className="text-sm text-muted">{hint}</span>}
        </span>
        <input id={id} name={name} type="file" accept={accept} className="sr-only" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
      </label>
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}
