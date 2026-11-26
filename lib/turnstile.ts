const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: unknown, ip?: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is not set");
  if (!token || typeof token !== "string") return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.append("remoteip", ip);

  const res = await fetch(VERIFY_URL, { method: "POST", body, cache: "no-store" });
  const data = (await res.json()) as {
    success: boolean;
    "error-codes"?: string[];
    hostname?: string;
    challenge_ts?: string;
  };

  // لاگ موقت: بعد از تست پاکش کن
  console.log("Turnstile:", {
    success: data.success,
    errors: data["error-codes"],
    hostname: data.hostname,
    challenge_ts: data.challenge_ts,
    
  });

  if (!data.success) console.warn("Turnstile rejected:", data["error-codes"]);
  return data.success;
}