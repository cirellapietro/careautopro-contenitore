/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Forza Next.js a ignorare le rotte dinamiche mancanti durante l'export
  dynamicRoutes: ['/dashboard/admin/roles/[id]', '/dashboard/admin/users/[id]'],
  trailingSlash: true,
};
export default nextConfig;
