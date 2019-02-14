// ref: https://umijs.org/config/
const path = require('path');
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: true,
        title: 'sangoes-web',
        dll: true,
        routes: {
          exclude: [],
        },
        dynamicImport: {
          // 加载
          loadingComponent: './components/PageLoading/index',
        },
        dll: {
          exclude: [],
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        hardSource: true,
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
      },
    ],
  ],
  targets: {
    ie: 10,
  },
  history: 'hash',
  proxy: {
    '/api': {
      target: 'http://localhost:8080/api',
      // target: 'http://47.105.125.60:8080/api',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  alias: {
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets/'),
    components: path.resolve(__dirname, 'src/components/'),
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  theme: {
    'primary-color': '#1890ff',
  },
};
