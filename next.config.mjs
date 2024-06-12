/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "source.unsplash.com",
            "localhost:1337",
            "localhost",
            "localhost:3000",
            "127.0.0.1",
            "127.0.0.1:1337",
            "summerschool.fashional.pro",
        ],
    },
    async rewrites() {
        return [
            {
                source: "/danh-sach-khoa-hoc",
                destination: "/course",
            },
            {
                source: "/khoa-hoc/:id",
                destination: "/course/:id",
            },
            {
                source: "/bai-viet",
                destination: "/blog",
            },
            {
                source: "/bai-viet/:id",
                destination: "/blog/:id",
            },
            // {
            //     source: "/profile/:slug",
            //     destination: "/profile/:slug",
            // },
        ];
    },
    experimental: { esmExternals: true },
};
export default nextConfig;
