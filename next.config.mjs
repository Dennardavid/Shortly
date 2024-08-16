/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qwyznumhzaledxnrjxtt.supabase.co",
      },
    ],
  },
};

export default nextConfig;