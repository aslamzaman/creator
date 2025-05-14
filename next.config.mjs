/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
        remotePatterns: [
            new URL('https://m.media-amazon.com/images/**'),
            new URL('http://localhost:3000/**'),
            new URL('https://ichef.bbci.co.uk/**')
        ],
    },
};

export default nextConfig;
