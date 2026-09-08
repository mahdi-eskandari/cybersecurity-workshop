/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "directus.mrbilit.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
