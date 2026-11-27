import path from "path";

// می‌تونی با UPLOAD_DIR توی .env مسیر دیگه‌ای بدی (مثلاً /var/www/parahoor-uploads)
export const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads", "media");