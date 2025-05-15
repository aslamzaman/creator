/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
         remotePatterns: [
            new URL("https://i.abcnewsfe.com/**"),
            new URL('https://m.media-amazon.com/images/**'),
            new URL('http://localhost:3000/**'),
            new URL('https://ichef.bbci.co.uk/**'),
            new URL("https://d1hvy853o5y8ex.cloudfront.net/**"),
        ],
    },
};

export default nextConfig;
