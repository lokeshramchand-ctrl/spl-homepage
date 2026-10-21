export const SITE_URL = "https://splsystems.in";
export const SITE_NAME = "SPL Systems";
export const SITE_TAGLINE = "Engineering the Intelligent Future";
export const SITE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  "SPL Systems builds high-performance digital infrastructure for ambitious enterprises: custom software, AI-powered platforms and automation for finance, real estate, government and education.";
export const SITE_EMAIL = "pri@splsystems.in";
export const SITE_PHONE = "+1 (650) 993-9799";
export const SITE_PHONE_E164 = "+16509939799";
export const SITE_LOGO = "/sites/splsystems/images/logo/spl-systems.svg";
export const SITE_ICON = "/sites/splsystems/images/logo/favicon.svg";

export const SITE_KEYWORDS = [
  "SPL Systems",
  "custom software development",
  "AI-powered platforms",
  "enterprise software",
  "automation",
  "workflow systems",
  "examination management",
  "Hyderabad",
  "San Jose",
];

export const SITE_PAGES = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects/sheetsense", changeFrequency: "monthly", priority: 0.6 },
  { path: "/projects/zoninglens", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
] as const;
