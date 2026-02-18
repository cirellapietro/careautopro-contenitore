/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  trailingSlash: true,
  // Forza il superamento di eventuali errori di route
  skipTrailingSlashRedirect: true,
  distDir: 'out',
};
export default nextConfig;
