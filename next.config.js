// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any hostname
        port: '', // Allows any port
        pathname: '**', // Allows any pathname
      },
      {
        protocol: 'http',
        hostname: '**', // Allows any hostname
        port: '', // Allows any port
        pathname: '**', // Allows any pathname
      },
      {
        protocol: 'http',
        hostname: 'localhost', // Allows any hostname
        port: '', // Allows any port
        pathname: '**', // Allows any pathname
      },
    ],
  },
};
