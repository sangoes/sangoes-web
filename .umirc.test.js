export default {
  proxy: {
    '/api': {
      target: 'http://47.105.125.60:8080/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
