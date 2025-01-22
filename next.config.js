/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['images.music.onepeloton.com','images.amplified.com']
    },
}

module.exports = nextConfig