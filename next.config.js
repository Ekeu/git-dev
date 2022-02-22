/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    CLOUDINARY_UPLOAD_ENDPOINT:
      'https://api.cloudinary.com/v1_1/dmcookpro/image/upload',
  },
};

module.exports = nextConfig;
