// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: [
        '/*utm_',
        '/*profile',
        '/*?',
        '/*rsc',
      ],
    },
    // اگر سایت‌مپ داری، می‌توانی خط زیر را فعال کنی (اختیاری):
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}