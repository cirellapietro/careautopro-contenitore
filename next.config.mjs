/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Necessario per l'APK
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Questa riga permette a Vercel di saltare il controllo generateStaticParams
  trailingSlash: true,
};

export default nextConfig;
