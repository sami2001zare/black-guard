import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Configure allowed quality values
    qualities: [75, 85, 90, 95],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);