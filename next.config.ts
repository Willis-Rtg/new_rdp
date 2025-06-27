import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tqklhszfkvzk6518638.edge.naverncp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "cdn2.bgfretail.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.woodongs.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.7-eleven.co.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "msave.emart24.co.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
