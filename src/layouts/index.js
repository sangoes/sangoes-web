import styles from './index.css';
import UserLayout from './UserLayout';

export default function BasicLayout(props) {
  /**
   * 登陆 注册 忘记密码
   */
  if (props.location.pathname.match('/user/*')) {
    return <UserLayout>{props.children}</UserLayout>;
  }

  return <div>{props.children}</div>;
}
