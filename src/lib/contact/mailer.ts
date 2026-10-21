import nodemailer, { type Transporter } from "nodemailer";
import { SITE_EMAIL } from "@/lib/site";
import type { ContactMessage } from "./validate";

/**
 * SMTP delivery for the contact form, configured from the environment:
 *   SMTP_URL      e.g. smtps://user:password@smtp.example.com:465
 *   CONTACT_TO    inbox for enquiries (default: the site email)
 *   CONTACT_FROM  sender address (default: the SMTP user, else the site email)
 */
let transporter: Transporter | null = null;

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_URL);
}

function getTransporter(): Transporter {
  transporter ??= nodemailer.createTransport({
    url: process.env.SMTP_URL,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  return transporter;
}

function defaultFrom(): string {
  try {
    const user = decodeURIComponent(new URL(process.env.SMTP_URL ?? "").username);
    if (user.includes("@")) return user;
  } catch {
    // fall through to the site address
  }
  return SITE_EMAIL;
}

export async function sendContactEmail({ name, email, message }: ContactMessage, ip: string): Promise<void> {
  // Plain text only, and the visitor's address goes in Reply-To rather than
  // From: we never send as them (that would fail SPF/DMARC), and nodemailer
  // encodes every header value, so nothing they type can add headers.
  await getTransporter().sendMail({
    from: { name: "SPL Systems website", address: process.env.CONTACT_FROM || defaultFrom() },
    to: process.env.CONTACT_TO || SITE_EMAIL,
    replyTo: { name, address: email },
    subject: `Website enquiry from ${name}`,
    text: `${message}\n\n-- \n${name} <${email}>\nSent from the contact form at splsystems.in (IP ${ip})`,
  });
}
