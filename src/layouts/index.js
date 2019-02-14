import styles from './index.css';
import UserLayout from './UserLayout';
import BasicLayout from './BasicLayout';
import router from 'umi/router';
import SettingPage from '@/pages/account/setting';

/**
 * umi
 * @param {*} props
 */
export default function IndexLayout(props) {
  const { location } = props;
  const currentPath = location.pathname;
  // FIXME 需要优化以下处理url方式
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
   * 个人设置
   */
  if (currentPath.startsWith('/account/setting/')) {
    return (
      <BasicLayout>
        <SettingPage>{props.children}</SettingPage>
      </BasicLayout>
    );
  }
  /**
   * 主页
   */
  return <BasicLayout>{props.children}</BasicLayout>;
}
