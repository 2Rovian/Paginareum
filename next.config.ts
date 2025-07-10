import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rqmplbrluzmidhfjiicg.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'rqmplbrluzmidhfjiicg.supabase.co',
//         pathname: '/storage/v1/object/public/**',
//       },
//     ],
//   },
// };


export default nextConfig;
