import { NextRequest, NextResponse } from "next/server";

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const ANALYTICS_ENDPOINT = "https://analytics.priyatham.in/open/workspace/clnzoxcy10001vy2ohi4obbi0/survey/cmc5z1pca03jx95kud4x3c2a1/submit";

interface ContactPayload {
  field_ypUi: string; // Name
  field_pMMK: string; // Email
  field_C0O4: string; // Comment
  recaptchaToken: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error("RECAPTCHA_SECRET_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    if (!response.ok) {
      console.error("ReCAPTCHA verification request failed");
      return false;
    }

    const data = await response.json();

    // Check if verification was successful and score is good (for v3)
    // For v2 checkbox, just check success flag
    if (data.success) {
      // Optional: if using v3, you can check the score (0.0 to 1.0, 1.0 being most human-like)
      // const score = data.score || 1.0;
      // return score > 0.5;
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: { payload: ContactPayload } = await request.json();
    const { field_ypUi, field_pMMK, field_C0O4, recaptchaToken } = body.payload;

    // Validate required fields
    if (!field_ypUi || !field_pMMK || !field_C0O4 || !recaptchaToken) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    const isValidCaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidCaptcha) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 403 }
      );
    }

    // Forward to analytics endpoint (exclude recaptchaToken for security)
    const analyticsPayload = {
      payload: {
        field_ypUi,
        field_pMMK,
        field_C0O4,
      },
    };

    const analyticsResponse = await fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(analyticsPayload),
    });

    if (!analyticsResponse.ok) {
      console.error("Analytics endpoint error:", analyticsResponse.statusText);
      return NextResponse.json(
        { error: "Failed to submit form" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
