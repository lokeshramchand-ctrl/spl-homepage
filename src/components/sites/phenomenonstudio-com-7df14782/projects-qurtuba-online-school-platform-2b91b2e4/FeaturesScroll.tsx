"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RevealWords, ScrambleText } from "../shared/reveal";

const ASSET = "/sites/phenomenonstudio-com-7df14782/projects-qurtuba-online-school-platform-2b91b2e4/images";

const FEATURES = [
  {
    title: "Lesson builder",
    image: "feature-1-lesson-builder.png.webp",
    problem:
      "Teachers needed a flexible and intuitive tool to create and organize lessons, balancing theory and practical tasks. The absence of a streamlined tool made it difficult to structure courses effectively and incorporate engaging activities.",
    bullets: [
      "We designed a customizable lesson builder for seamless lecture and activity organization.",
      "Builder supports various content types (videos, text, audio, documents) across topics and chapters.",
      "Drag-and-drop features allow easy reordering of sections.",
      "Quizzes and practice tasks can be embedded directly into lessons for enhanced interaction.",
    ],
  },
  {
    title: "Assessments feature",
    image: "feature-2-assessments.png.webp",
    problem:
      "Teachers faced challenges with poor user experience, data loss due to lack of warnings when canceling actions, and the need to switch to third-party platforms for functionality.",
    bullets: [
      "Developed a comprehensive assessment feature for easy homework management, including attachment uploads and clear assignment guidelines.",
      "Improved grading features with annotations for detailed feedback, including support for hybrid assignments.",
      "Introduced online tests with diverse question types and automated grading for timely feedback.",
      "Enhanced the UX to reduce dependence on third-party platforms and ensure a cohesive experience.",
      "Added warnings for unsaved changes to prevent data loss when canceling actions.",
    ],
  },
  {
    title: "Interactive tasks feature",
    image: "feature-3-interactive-tasks.png.webp",
    problem:
      "Homework was often monotonous and lacked engagement, making it harder for children to stay motivated. Additionally, there were challenges like unclear instructions, difficulty in tracking progress, and the need for external tools to make assignments interactive.",
    bullets: [
      "Develop features with interactive exercises, gamified elements, and multimedia content to spark children's interest.",
      "Enabled easy attachment uploads and step-by-step instructions for clear assignment completion.",
      "Added tracking features for parents and teachers to monitor progress and provide timely support.",
      "Introduced quizzes and challenges with diverse question types, including drag-and-drop and visual puzzles, to make learning fun.",
      "Improved the UX to provide a seamless, intuitive experience without relying on third-party tools.",
    ],
  },
  {
    title: "Calendar feature",
    image: "feature-4-calendar.png.webp",
    problem:
      "Teachers and students previously faced challenges with tracking schedules, managing meetings, and keeping organized due to a lack of cohesive calendar functionality.",
    bullets: [
      "Redesigned the calendar for easy viewing of schedules and clear event details for each day.",
      "Improved the layout to ensure information is presented clearly, enhancing usability and readability.",
      "Added reminders for important events and deadlines to help users stay organized.",
      "Enabled efficient creation and management of meetings.",
    ],
  },
  {
    title: "Fees module",
    image: "feature-5-fees.png.webp",
    problem:
      "Users struggled with fee-related tasks due to a disorganized interface and flaws in the payment system, such as allowing transactions with zero balance or invalid amounts. Additionally, payment details were displayed to children, creating unnecessary confusion.",
    bullets: [
      "Redesigned the interface for better usability, hiding payment details from children to display only relevant information for them.",
      "Fixed payment issues by adding validation checks to ensure valid transactions.",
      "Integrated a payment gateway and improved workflows for invoicing, receipts, and subscriptions, making fee management faster and more efficient.",
    ],
  },
  {
    title: "Enrolment module",
    image: "feature-6-enrolment.png.webp",
    problem:
      "Administrators faced significant challenges navigating and managing enrolment processes due to an unintuitive interface and lack of clear structure. Applications were scattered and difficult to locate, while the absence of visual prioritization made oversight and task management inefficient and time-consuming.",
    bullets: [
      "Developed an application builder for creating custom enrolment forms tailored to different educational programs.",
      "Redesigned the interface for easy navigation and efficient task management.",
      "Added a centralized dashboard to provide a clear overview of applications.",
      "Simplified workflows, improving speed and accuracy in managing online applications and registrations.",
    ],
  },
  {
    title: "Messenger feature",
    image: "feature-7-messenger.png.webp",
    problem:
      'Users faced challenges with the Messenger feature, including unclear message organization and ineffective search functions. Key features for admins, like the "Create Broadcast Message" button, were hidden, complicating usage. Additionally, users encountered duplicate chats for the same user.',
    bullets: [
      "Added sorting options to display new messages at the top for quick access.",
      "Adjusted the layout to minimize accidental destructive actions.",
      "Improved management and implemented checks to stop users from creating identical chats.",
    ],
  },
];

function FeatureItem({
  feature,
  active,
  registerRef,
}: {
  feature: (typeof FEATURES)[number];
  active: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={registerRef}
      className="flex min-h-[420px] flex-col justify-center py-12 transition-opacity duration-300 sm:min-h-[560px]"
      style={{ opacity: active ? 1 : 0.5 }}
    >
      <h3 className="text-2xl font-medium text-[#080d10] sm:text-3xl">{feature.title}</h3>
      <p className="font-body mt-4 text-sm text-[#080d10]/70">{feature.problem}</p>
      <p className="font-body mt-6 text-sm font-semibold text-[#080d10]">What we&apos;ve done:</p>
      <ul className="font-body mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm text-[#080d10]/70">
        {feature.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {/* Mobile-only inline image since the sticky illustration column is desktop-only */}
      <div className="mt-8 overflow-hidden rounded-2xl bg-[#f4f5f4] lg:hidden">
        <Image src={`${ASSET}/${feature.image}`} alt={feature.title} width={1200} height={900} className="w-full object-cover" />
      </div>
    </div>
  );
}

export function FeaturesScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-[1440px] px-4">
        <ScrambleText text="Features" as="p" className="font-body text-xs font-semibold uppercase tracking-wide text-[#080d10]/50" />
        <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-[#080d10] sm:text-5xl">
          <RevealWords text="Feature-rich tools built for every role" />
        </h2>

        <div className="mt-12 flex flex-col gap-8 sm:mt-16 lg:flex-row">
          <div className="hidden lg:sticky lg:top-28 lg:block lg:h-fit lg:w-[58%] lg:shrink-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#f4f5f4]">
              {FEATURES.map((f, i) => (
                <Image
                  key={f.image}
                  src={`${ASSET}/${f.image}`}
                  alt={f.title}
                  fill
                  sizes="60vw"
                  className="object-cover transition-opacity duration-[600ms]"
                  style={{ opacity: activeIndex === i ? 1 : 0 }}
                />
              ))}
            </div>
          </div>

          <div className="flex-1">
            {FEATURES.map((f, i) => (
              <FeatureItem
                key={f.title}
                feature={f}
                active={activeIndex === i}
                registerRef={(el) => {
                  itemRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
