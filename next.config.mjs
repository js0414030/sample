/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@auth0/nextjs-auth0'],
    webpack: (config) => {
        config.externals = [...(config.externals || []), '@auth0/nextjs-auth0'];
        return config;
    },
};

export default nextConfig; 