/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = {
    reactStrictMode: true,
    images: {
        domains: ['bluhemglezuxswtcifom.supabase.in'],
    },
};

module.exports = withBundleAnalyzer({
    reactStrictMode: true,
});
