/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  output: 'standalone',
  env: {
    SITE_ID: process.env.SITE_ID,
    AUTH_KEY: process.env.AUTH_KEY,
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_API_URL_PUBLIC: process.env.BASE_API_URL_PUBLIC,
    RELEASE_VERSION: process.env.RELEASE_VERSION,
    PRELOADER_TIMEOUT: process.env.PRELOADER_TIMEOUT,
    COLOR_PRIMARY: process.env.COLOR_PRIMARY,
    COLOR_SUCCESS: process.env.COLOR_SUCCESS,
    COLOR_INFO: process.env.COLOR_INFO,
    COLOR_WARNING: process.env.COLOR_WARNING,
    COLOR_DANGER: process.env.COLOR_DANGER
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    loader: 'akamai',
    path: '.',
    domains: [''],
  },
}
