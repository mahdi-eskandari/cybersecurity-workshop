import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function isAdmin(): Promise<boolean> {
  try {
    const token = (await cookies()).get("token")?.value;
    const secret = process.env.JWT_SECRET;
    if (!token || !secret) return false;

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );
    return payload.role === "admin";
  } catch {
    return false;
  }
}