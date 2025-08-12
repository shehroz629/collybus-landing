/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // If your base path in S3 is not the root, you might need to set basePath here.
  // For example, if deploying to s3://YOUR_S3_BUCKET_NAME/landing/
  // basePath: '/landing',
};

module.exports = nextConfig; 