/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  i18n: {
    locales: ['fa'],
    defaultLocale: 'fa',
  },
}

module.exports = nextConfig

