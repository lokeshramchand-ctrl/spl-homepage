export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export type FieldErrors = Partial<Record<keyof ContactMessage, string>>;

export const LIMITS = { name: 100, email: 254, messageMin: 10, messageMax: 5000 } as const;

// Pragmatic address check (one @, a dot in the domain, no spaces); the real
// test is whether our reply arrives.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// CR/LF or other control characters in a single-line field are header
// injection attempts; the message body may contain newlines and tabs only.
const CONTROL = /[\u0000-\u001f\u007f]/;
const BODY_CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

/** Shared by the form (instant feedback) and the API (the authority). */
export function validateContact(input: Record<string, unknown>): { data: ContactMessage; errors: FieldErrors } {
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const data: ContactMessage = {
    name: str(input.name).trim(),
    email: str(input.email).trim(),
    message: str(input.message).trim(),
  };
  const errors: FieldErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > LIMITS.name) errors.name = `Please keep your name under ${LIMITS.name} characters.`;
  else if (CONTROL.test(data.name)) errors.name = "Your name contains characters we can't accept.";

  if (!data.email) errors.email = "Please enter your email.";
  else if (data.email.length > LIMITS.email || CONTROL.test(data.email) || !EMAIL.test(data.email))
    errors.email = "Please enter a valid email address.";

  if (data.message.length < LIMITS.messageMin)
    errors.message = `Please write at least ${LIMITS.messageMin} characters.`;
  else if (data.message.length > LIMITS.messageMax)
    errors.message = `Please keep your message under ${LIMITS.messageMax} characters.`;
  else if (BODY_CONTROL.test(data.message)) errors.message = "Your message contains characters we can't accept.";

  return { data, errors };
}
