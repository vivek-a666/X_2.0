/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      missingSuspenseWithCSRBailout: false,
      disableOptimizedLoading: true,
    },
  };
  
  export default nextConfig;