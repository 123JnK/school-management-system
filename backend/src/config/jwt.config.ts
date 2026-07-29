export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'change-this-secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
});