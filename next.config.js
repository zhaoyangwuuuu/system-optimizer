/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/resources",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
