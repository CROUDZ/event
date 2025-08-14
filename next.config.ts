import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Enable static export and write an export manifest after build
	output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
