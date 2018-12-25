import styles from './index.css';
import UserLayout from './UserLayout';
import BasicLayout from './BasicLayout';
import router from 'umi/router';
// import NProgress from 'nprogress';
// import withRouter from 'umi/withRouter';

/**
 * umi
 * @param {*} props
 */
export default function IndexLayout(props) {
  const { location } = props;
  const currentPath = location.pathname;
  // console.log(props);

  // let currHref = '';
  // // 浏览器地址栏中地址
  // const href = window.location.href;
  // // currHref 和 href 不一致时说明进行了页面跳转
  // if (currHref !== href) {
  //   // 页面开始加载时调用 start 方法
  //   NProgress.start();
  //   // loading.global 为 false 时表示加载完毕
  //   if (!loading.global) {
  //     // 页面请求完毕时调用 done 方法
  //     NProgress.done();
  //     // 将新页面的 href 值赋值给 currHref
  //     currHref = href;
  //   }
  // }

  /**
   * 登陆
   */
  if (currentPath === '/user/login') {
    // 处理直接在地址栏输入/user/login
    const token = sessionStorage.getItem('access_token');
    if (token) {
      router.goBack();
    }
    return <UserLayout>{props.children}</UserLayout>;
  }
  /**
   * 注册 忘记密码
   */
  if (currentPath.startsWith('/user')) {
    return <UserLayout>{props.children}</UserLayout>;
  }
  /**
   * 异常页面
   */
  if (currentPath.startsWith('/exception')) {
    return <div>{props.children}</div>;
  }
  /**
   * 主页
   */
  return <BasicLayout>{props.children}</BasicLayout>;
}

// export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App));
