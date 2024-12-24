import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yoaeoftmjizxtuvyfymq.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default withVanillaExtract(nextConfig);
