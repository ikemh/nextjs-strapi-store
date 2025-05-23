/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "10.0.0.159"], // permite carregar imagens de http://localhost:1337
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "10.0.0.159",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
