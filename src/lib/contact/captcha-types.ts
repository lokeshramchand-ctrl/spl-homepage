/** Proof-of-work challenge: find `number` in [0, maxNumber] with sha256(salt + number) === challenge. */
export interface CaptchaChallenge {
  salt: string;
  challenge: string;
  maxNumber: number;
  signature: string;
}

export interface CaptchaSolution {
  salt: string;
  challenge: string;
  signature: string;
  number: number;
}
