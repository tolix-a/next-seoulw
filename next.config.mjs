/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const nextConfigFunction = async (phase) => {
  
  const withPWA = (await import("@ducanh2912/next-pwa")).default({
    dest: "public",
    cacheOnFrontendNav:true,
    aggressiveFrontEndNavCaching:true,
    disable:false,
    reloadOnOnline:true,
    
    swcMinify:true,
    workboxOptions:{ disableDevLogs:true }

  });
  return withPWA(nextConfig);

};

export default nextConfigFunction;
