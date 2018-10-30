import path from 'path';
// ref: https://umijs.org/config/
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
        dll: {
          exclude: [],
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        hardSource: true,
      },
    ],
  ],
  targets: {
    ie: 10,
  },
  history: 'hash',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
};
