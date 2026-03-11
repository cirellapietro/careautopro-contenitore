/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Necessario per APK statico
  distDir: 'out',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // RISOLUZIONE ERRORE '_webpack.WebpackError is not a constructor':
      // Disabilitiamo la minimizzazione che va in crash con OpenTelemetry/Genkit
      config.optimization.minimize = false;

      // Isolamento forzato dei moduli Node.js server-only per il client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        tls: false, net: false, dns: false, child_process: false,
        fs: false, http2: false, dgram: false, async_hooks: false,
        util: false, events: false, https: false, http: false,
        url: false, buffer: false, path: false, crypto: false,
        stream: false, os: false, querystring: false, process: false,
      };
      
      // Scudo extra contro le dipendenze annidate di Google/Genkit
      config.externals = [...(config.externals || []), /^node:/, 'genkit', '@genkit-ai/ai', '@genkit-ai/core', '@genkit-ai/flow', '@genkit-ai/googleai', '@opentelemetry/api', '@opentelemetry/sdk-trace-base', '@opentelemetry/sdk-trace-node'];
    }
    return config;
  },
};
export default nextConfig;
