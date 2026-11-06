export function getIp(req: Request): string {
  // پشت Cloudflare: فقط همین هدر قابل اعتماده
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf;

  // پشت پروکسی خودت (nginx و...): آخرین مقدار را بردار، نه اولین
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",").at(-1)!.trim();

  return "unknown";
}