module.exports = {
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST_API : 'http://localhost:8083',
    HOST_API: process.env.HOST_API || 'https://manus-o-teu-lugar-backend.vercel.app',
    MAPBOX_API: process.env.MAPBOX_API || '',
    CLIENT_SECRET: process.env.CLIENT_SECRET || '',
    CLIENT_ID: process.env.CLIENT_ID || '',
    AWS_REGION: process.env.AWS_REGION || 'eu-west-1',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
    INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN || '',
  },
};

// Force rebuild Mon Aug 18 19:33:54 EDT 2025
