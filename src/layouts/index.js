import styles from './index.css';
import UserLayout from './UserLayout';
import BasicLayout from './BasicLayout';

export default function IndexLayout(props) {
  /**
   * 登陆 注册 忘记密码
   */
  if (props.location.pathname.startsWith('/user')) {
    return <UserLayout>{props.children}</UserLayout>;
  }
  /**
   * 异常页面
   */
  if (props.location.pathname.startsWith('/exception')) {
    return <div>{props.children}</div>;
  }
  /**
   * 主页
   */
  return <BasicLayout>{props.children}</BasicLayout>;
}
