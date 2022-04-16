/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig && {
  images: {
    domains: ["fakestoreapi.com", "www.junglescout.com"],
  },
};
