"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { ArrowRightIcon, PaperclipIcon } from "../shared/icons";

const ASSET = "/sites/phenomenonstudio-com-7df14782/contact-us-ae5848da";

const BUDGETS = ["Up to $10K", "$10-$20K", "$20-$50K", "$50-$100K", ">$100K"];

const inputClasses =
  "w-full border-b border-white/10 bg-transparent pb-3 text-sm font-bold tracking-wide text-white uppercase outline-none transition-colors placeholder:text-white focus:border-white/40";

export function ContactForm() {
  const [budget, setBudget] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-10 flex flex-col items-start gap-6 lg:mt-16">
        <Image src={`${ASSET}/images/circle-check.svg`} alt="" width={49} height={49} />
        <h2 className="text-3xl font-medium text-white sm:text-4xl">Thanks for taking time to reach out!</h2>
        <p className="text-base text-white/60">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 lg:mt-16">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label className="font-body text-xs font-semibold uppercase tracking-wide text-white/40">Your name</label>
          <input required type="text" placeholder="Enter your name *" className={`mt-3 ${inputClasses}`} />
        </div>
        <div>
          <label className="font-body text-xs font-semibold uppercase tracking-wide text-white/40">Your email</label>
          <input required type="email" placeholder="Enter your email *" className={`mt-3 ${inputClasses}`} />
        </div>
      </div>

      <div className="mt-8">
        <label className="font-body text-xs font-semibold uppercase tracking-wide text-white/40">Message</label>
        <input type="text" placeholder="Tell us about your project" className={`mt-3 ${inputClasses}`} />
      </div>

      <label className="mt-8 inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-white/70 transition-colors hover:bg-white/15">
        <input type="file" className="hidden" multiple />
        <PaperclipIcon className="size-4" />
        Attach file
      </label>

      <div className="mt-8">
        <p className="font-body text-xs font-semibold uppercase tracking-wide text-white/40">Your budget for this project?</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              className="rounded-lg border px-5 py-3.5 text-xs font-semibold uppercase tracking-wide transition-colors"
              style={
                budget === b
                  ? { backgroundColor: "#fff", color: "#080d10", borderColor: "#fff" }
                  : { backgroundColor: "transparent", color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)" }
              }
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ff7a00] px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#080d10]"
        >
          <span>Submit</span>
          <ArrowRightIcon className="size-3.5" />
        </button>
        <p className="font-body max-w-xs text-xs text-white/40">
          By clicking this button you accept{" "}
          <a href="/terms-of-use" className="underline underline-offset-2 hover:text-white/70">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:text-white/70">
            Privacy Policy
          </a>
        </p>
      </div>
    </form>
  );
}
