/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "10.0.0.159"], // permite carregar imagens de http://localhost:1337
  },
};

export default nextConfig;
