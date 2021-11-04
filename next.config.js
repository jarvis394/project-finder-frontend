/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')
const isProduction = process.env.NODE_ENV === 'production'
const moduleExports = {
  webpack5: true,
  pwa: {
    dest: 'public',
    register: false,
    skipWaiting: false,
    disable: !isProduction,
  },
  env: {
    PUBLIC_URL: 'https://project-finder-frontend.vercel.app',
  },
}

module.exports = withPWA(moduleExports)
