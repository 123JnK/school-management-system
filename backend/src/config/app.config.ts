export default () => ({
  app: {
    name: 'MySchool Platform',
    version: '1.0.0',
    port: parseInt(process.env.PORT || '3001', 10),
    environment: process.env.NODE_ENV || 'development',
  },
});