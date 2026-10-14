"use client";

import { useState, type FormEvent } from "react";

const FIELD =
  "w-full border-b border-[#181818]/30 bg-transparent py-3 text-[1rem] tracking-[-0.03em] text-[#181818] outline-none transition-colors placeholder:text-[#181818]/40 focus:border-[#181818]";

/**
 * There is no backend, so submitting composes an email to the team in the
 * visitor's mail client instead of silently dropping the message.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `Enquiry from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:pri@splsystems.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-[720px] flex-col gap-6 border-t border-[#181818]/20 pt-10"
    >
      <h3 className="text-[1.5rem] font-medium tracking-[-0.03em] text-[#181818]">Send us a message</h3>
      <label className="flex flex-col gap-1 text-xs font-medium text-[#181818]/60">
        Name
        <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={FIELD} />
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium text-[#181818]/60">
        Contact email
        <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={FIELD} />
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium text-[#181818]/60">
        Message
        <textarea name="message" required rows={5} placeholder="Tell us about your project" className={FIELD} />
      </label>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="bg-[#181818] px-6 py-3 text-[0.95rem] font-medium tracking-[-0.03em] text-white transition-opacity hover:opacity-80"
        >
          Send message
        </button>
        {sent ? (
          <p role="status" className="text-sm text-[#181818]/60">
            Opening your email app. If nothing opens, write to pri@splsystems.in.
          </p>
        ) : null}
      </div>
    </form>
  );
}
