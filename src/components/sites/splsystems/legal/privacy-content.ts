import { SITE_EMAIL } from "@/lib/site";

export const PRIVACY_UPDATED = "October 14, 2026";

export type PolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
};

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: "overview",
    title: "Who we are",
    paragraphs: [
      "SPL Systems, Inc. (\"SPL Systems\", \"we\", \"us\") builds custom software, AI-powered platforms and automation for finance, real estate, government and education. We have offices in Hyderabad, India and San Jose, California.",
      "This policy explains what personal information we collect through splsystems.in (the \"Site\"), why we collect it, and the choices you have. It applies to visitors and to people who contact us. It does not cover the software we build for clients, which is governed by our agreements with them.",
    ],
  },
  {
    id: "collect",
    title: "Information we collect",
    paragraphs: ["We keep collection to the minimum needed to respond to you and run the Site."],
    items: [
      "Information you give us: your name, email address and the message you write when you use the contact form or email or call us, plus anything else you choose to share about your project.",
      "Technical information: our hosting provider may log your IP address, browser type, device type and the pages requested when your browser connects to the Site. This is standard for any website.",
      "Business information: if we work together, we hold the contact details and project information needed to deliver and invoice our services.",
    ],
  },
  {
    id: "not-collect",
    title: "What we do not collect",
    paragraphs: [
      "The Site does not require an account, does not take payments, and does not use advertising or cross-site tracking cookies. We do not knowingly collect sensitive categories of data such as health, biometric or financial account details through the Site. Please do not send them to us in a message.",
    ],
  },
  {
    id: "contact-form",
    title: "How the contact form works",
    paragraphs: [
      `When you press "Send message", the name, email address and message you entered are sent over an encrypted connection to our server, which emails them to ${SITE_EMAIL}. We do not store them in a database. To keep the form free of spam, your browser first solves a small computational puzzle (a proof-of-work check) that we generate ourselves; it uses no third-party service, cookies or tracking. Our server briefly keeps your IP address in memory to limit repeated submissions, and includes it in the enquiry email so we can investigate abuse.`,
    ],
  },
  {
    id: "use",
    title: "How we use information",
    paragraphs: [
      "We do not use your information for automated decisions that have legal effects on you, and we do not sell it.",
    ],
    items: [
      "To reply to your enquiry and provide a consultation or proposal.",
      "To deliver, support and invoice projects when we work together.",
      "To keep the Site secure, diagnose faults and prevent abuse.",
      "To meet legal, tax and accounting obligations.",
      "To improve the Site, using only the technical information described above in aggregate.",
    ],
  },
  {
    id: "basis",
    title: "Legal bases",
    paragraphs: [
      "Where the GDPR or similar laws apply, we process personal data because: you asked us to respond to you or to enter into a contract (contract and pre-contract steps); we have a legitimate interest in running a secure business website and answering business enquiries; we must comply with a legal obligation; or you gave consent, which you may withdraw at any time.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    paragraphs: ["We do not sell or rent personal information. We share it only with:"],
    items: [
      "Service providers that help us operate, such as website hosting, email and document tools, bound to use it only on our behalf.",
      "Professional advisers, auditors and authorities where required by law or to protect our legal rights.",
      "A successor organization if SPL Systems is involved in a merger, acquisition or sale of assets, with notice to you where required.",
    ],
  },
  {
    id: "transfers",
    title: "International transfers",
    paragraphs: [
      "We operate in India and the United States, so your information may be processed in either country and in the countries where our providers operate. Where required, we rely on safeguards such as standard contractual clauses to protect personal data transferred out of the EEA, UK or Switzerland.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    paragraphs: ["We keep information only as long as needed for the purposes above:"],
    items: [
      "Enquiries that do not lead to a project: up to 24 months after our last contact, then deleted.",
      "Client and project records: for the length of the engagement plus the period required for tax, accounting and legal purposes (generally up to 7 years).",
      "Server logs: typically no more than 90 days.",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    paragraphs: [
      "Depending on where you live, you may have the right to access the personal information we hold about you, correct it, delete it, restrict or object to its use, receive a portable copy, and withdraw consent. Residents of California and other US states may also request details of the categories of data collected and disclosed. We do not sell or share personal information for cross-context advertising, and we will not treat you differently for exercising your rights.",
      `To make a request, email ${SITE_EMAIL}. We may need to verify your identity and will respond within 30 days. If you are in the EEA or UK you can also complain to your local data protection authority. Indian residents may contact us first, and may use the grievance routes available under the Digital Personal Data Protection Act, 2023.`,
    ],
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    paragraphs: [
      "The Site does not set advertising or analytics cookies. Fonts are served from our own domain at build time. If we add analytics or other non-essential cookies in the future, we will update this policy and ask for consent where the law requires it. Your browser may store basic technical data to display the Site, which you can clear in your browser settings.",
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "We protect information with encrypted connections (HTTPS), access controls limited to people who need it, and providers that maintain recognized security standards. No method of transmission or storage is completely secure, so we cannot guarantee absolute security. If a breach affects your personal information, we will notify you and regulators as the law requires.",
    ],
  },
  {
    id: "children",
    title: "Children",
    paragraphs: [
      "The Site is intended for businesses and is not directed to children under 16. We do not knowingly collect their personal information. If you believe a child has sent us information, tell us and we will delete it.",
    ],
  },
  {
    id: "links",
    title: "Third-party links",
    paragraphs: [
      "The Site links to other services such as LinkedIn and AI assistants. Those sites have their own privacy practices and we are not responsible for them.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy as our practices or the law change. The date at the top shows the latest revision. For material changes we will post a notice on the Site before they take effect.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [
      `Questions or requests: ${SITE_EMAIL}. SPL Systems, Inc., with offices in Hyderabad, India and San Jose, California, USA.`,
    ],
  },
];
