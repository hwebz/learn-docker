/** @type {import('next').NextConfig} */
const nextConfig =(phase, { defaultConfig }) => {
  // Server-side Generation for development
  if (phase === 'development') {
    return {}
  }
  // Static-site Generation for production
  return {
    output: 'export'
  }
};

export default nextConfig;
