"use client";

import Image from "next/image";
import { CopyIcon, LinkedinIcon } from "../shared/icons";

const ASSET = "/sites/phenomenonstudio-com-7df14782/contact-us-ae5848da";

const REPS = [
  {
    prompt: "Have a project to\ndiscuss?",
    name: "Kseniia Shalia",
    role: "Account Executive",
    avatar: "ksenia.jpg.webp",
    email: "hello@phenomenon-studio.com",
    linkedin: "https://www.linkedin.com/in/kseniia-shalia-a21921240/",
  },
  {
    prompt: "Have a partnership in\nmind?",
    name: "Polina Chebanova",
    role: "Co-Founder & CPO",
    avatar: "polina.jpg.webp",
    email: "partnership@phenomenon-studio.com",
    linkedin: "https://www.linkedin.com/in/polina-chebanova/",
  },
];

export function ContactSidebar() {
  return (
    <div className="mt-16 flex flex-col divide-y divide-white/10 lg:mt-0 lg:border-l lg:border-white/10 lg:pl-12">
      {REPS.map((rep) => (
        <div key={rep.name} className="flex flex-col gap-6 py-8 first:pt-0 last:pb-0">
          <h3 className="text-2xl font-medium whitespace-pre-line text-white sm:text-3xl">{rep.prompt}</h3>
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <Image
                src={`${ASSET}/images/${rep.avatar}`}
                alt={rep.name}
                width={56}
                height={56}
                className="size-14 rounded-full object-cover"
              />
              <a
                href={rep.linkedin}
                target="_blank"
                rel="nofollow"
                className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded bg-white/10 text-white hover:bg-white/20"
              >
                <LinkedinIcon className="size-3" />
              </a>
            </div>
            <div>
              <p className="text-base text-white">{rep.name}</p>
              <span className="font-body text-sm text-white/50">{rep.role}</span>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigator.clipboard?.writeText(rep.email)}
                  className="text-white/50 hover:text-white"
                  aria-label="Copy email"
                >
                  <CopyIcon className="size-4" />
                </button>
                <a
                  href={`mailto:${rep.email}`}
                  className="font-body truncate text-xs font-semibold tracking-wide text-white uppercase underline underline-offset-4 hover:text-white/70"
                >
                  {rep.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
