import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/**')],
    },
};

export default nextConfig;
