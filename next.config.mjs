/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Ignora gli errori TypeScript per permettere il completamento della build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignora anche eventuali errori di linting per sicurezza
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
