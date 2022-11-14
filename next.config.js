/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.graphassets.com"],
  },
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
``;
