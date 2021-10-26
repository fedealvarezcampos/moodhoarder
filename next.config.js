/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' *.supabase.in *.vercel.app *.vercel.com;
    child-src *.google.com *.supabase.in;
    style-src 'self' 'unsafe-inline' *.googleapis.com;
    img-src 'self' *.supabase.in blob: data:;
    media-src 'self';
    font-src 'self' *.gstatic.com;
    connect-src *;
`;

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\n/g, ''),
    },
    {
        key: 'Access-Control-Allow-Origin',
        value: '*.supabase.in',
    },
    {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
    },
    {
        key: 'X-Frame-Options',
        value: 'DENY',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
    },
];

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    images: {
        domains: ['bluhemglezuxswtcifom.supabase.in'],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
});
