import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't bundle Node.js modules for the browser
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
                stream: false,
                url: false,
                zlib: false,
                http: false,
                https: false,
                assert: false,
                os: false,
                path: false,
                buffer: false,
                util: false,
                querystring: false,
            };
        }

        return config;
    },

    // Ensure server-side only modules are not bundled for client
    serverExternalPackages: ['jose', 'jsonwebtoken'],
};

export default nextConfig;
