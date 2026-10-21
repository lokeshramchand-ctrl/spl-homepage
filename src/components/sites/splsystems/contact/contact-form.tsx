"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import type { CaptchaSolution } from "@/lib/contact/captcha-types";
import { LIMITS, validateContact, type FieldErrors } from "@/lib/contact/validate";
import { SITE_EMAIL } from "@/lib/site";
import { Captcha, type CaptchaHandle } from "./captcha";

const FIELD =
  "w-full border-b bg-transparent py-3 text-[1rem] tracking-[-0.03em] text-[#181818] outline-none transition-colors placeholder:text-[#181818]/40 focus:border-[#181818] aria-[invalid=true]:border-[#db4550]";
const LABEL = "flex flex-col gap-1 text-xs font-medium text-[#181818]/60";

type Status = "idle" | "sending" | "sent" | "error";

const SERVER_ERRORS: Record<string, string> = {
  rate_limited: "Too many messages from your network. Please try again in a few minutes.",
  captcha_failed: "The spam check expired. Please verify again and resend.",
  unavailable: "Our form is temporarily unavailable.",
  delivery_failed: "We couldn't deliver your message just now.",
};

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <span id={id} className="text-xs font-medium text-[#db4550]">
      {message}
    </span>
  ) : null;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors & { captcha?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");
  const [messageLength, setMessageLength] = useState(0);
  const captchaRef = useRef<CaptchaHandle | null>(null);
  const solutionRef = useRef<CaptchaSolution | null>(null);

  const onCaptcha = useCallback((solution: CaptchaSolution | null) => {
    solutionRef.current = solution;
    if (solution) setErrors((e) => ({ ...e, captcha: undefined }));
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const { data, errors: fieldErrors } = validateContact(raw);
    const nextErrors: FieldErrors & { captcha?: string } = { ...fieldErrors };
    if (!solutionRef.current) nextErrors.captcha = "Please complete the spam check.";
    setErrors(nextErrors);
    setServerError(null);
    if (Object.keys(nextErrors).some((k) => nextErrors[k as keyof typeof nextErrors])) {
      const first = (["name", "email", "message"] as const).find((k) => nextErrors[k]);
      if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: raw.company ?? "", captcha: solutionRef.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; fields?: FieldErrors };
      if (res.ok) {
        setSentTo(data.email);
        setStatus("sent");
        form.reset();
        setMessageLength(0);
        return;
      }
      if (body.fields) setErrors(body.fields);
      setServerError(SERVER_ERRORS[body.error ?? ""] ?? "Something went wrong sending your message.");
      setStatus("error");
    } catch {
      setServerError("You appear to be offline. Check your connection and try again.");
      setStatus("error");
    }
    // A solution is single-use; any failed attempt needs a fresh check.
    captchaRef.current?.reset();
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="mx-auto flex w-full max-w-[720px] flex-col gap-4 border-t border-[#181818]/20 pt-10"
      >
        <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#179e76] text-white">
          <svg viewBox="0 0 12 12" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 6.5 4.8 9 10 3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="text-[1.5rem] font-medium tracking-[-0.03em] text-[#181818]">Message sent. Thank you.</h3>
        <p className="text-[1rem] tracking-[-0.03em] text-[#181818]/60">
          We&apos;ll reply to <span className="text-[#181818]">{sentTo}</span> as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="w-fit border-b border-[#181818] pb-1 text-[0.95rem] font-medium tracking-[-0.03em] text-[#181818]"
        >
          Send another message
        </button>
      </div>
    );
  }

  const invalid = (k: keyof FieldErrors) => (errors[k] ? true : undefined);
  const border = (k: keyof FieldErrors) => (errors[k] ? "" : "border-[#181818]/30");

  return (
    <form
      onSubmit={onSubmit}
      onInput={(e) => {
        // Clear a field's error as soon as the visitor edits it.
        const name = (e.target as HTMLInputElement).name as keyof FieldErrors;
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
      }}
      noValidate
      className="relative mx-auto flex w-full max-w-[720px] flex-col gap-6 border-t border-[#181818]/20 pt-10"
    >
      <h3 className="text-[1.5rem] font-medium tracking-[-0.03em] text-[#181818]">Send us a message</h3>
      <label className={LABEL}>
        Name
        <input
          name="name"
          type="text"
          required
          maxLength={LIMITS.name}
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={invalid("name")}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`${FIELD} ${border("name")}`}
        />
        <FieldError id="name-error" message={errors.name} />
      </label>
      <label className={LABEL}>
        Contact email
        <input
          name="email"
          type="email"
          required
          maxLength={LIMITS.email}
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={invalid("email")}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${FIELD} ${border("email")}`}
        />
        <FieldError id="email-error" message={errors.email} />
      </label>
      <label className={LABEL}>
        <span className="flex justify-between">
          Message
          <span className={messageLength > LIMITS.messageMax ? "text-[#db4550]" : "text-[#181818]/40"}>
            {messageLength}/{LIMITS.messageMax}
          </span>
        </span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={LIMITS.messageMax}
          placeholder="Tell us about your project"
          onChange={(e) => setMessageLength(e.target.value.length)}
          aria-invalid={invalid("message")}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${FIELD} ${border("message")} resize-y`}
        />
        <FieldError id="message-error" message={errors.message} />
      </label>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-1">
        <Captcha ref={captchaRef} onChange={onCaptcha} invalid={Boolean(errors.captcha)} />
        <FieldError id="captcha-error" message={errors.captcha} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 bg-[#181818] px-6 py-3 text-[0.95rem] font-medium tracking-[-0.03em] text-white transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? (
            <span aria-hidden="true" className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-white/30 border-t-white" />
          ) : null}
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {serverError ? (
          <p role="alert" className="text-sm text-[#db4550]">
            {serverError}{" "}
            <a href={`mailto:${SITE_EMAIL}`} className="underline">
              Email {SITE_EMAIL} instead
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
