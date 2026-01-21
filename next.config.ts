// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['localhost', 'web-zenith.vercel.app'], // Tambahkan domain yang digunakan
//   },
// };

// export default nextConfig

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost',
      'kantin-web.vercel.app',
      'dspsbwhzynraqkusdqth.supabase.co'
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dspsbwhzynraqkusdqth.supabase.co",
        pathname: "/storage/v1/object/public/foto_siswa/**",
      },
    ],
  },
};

export default nextConfig;