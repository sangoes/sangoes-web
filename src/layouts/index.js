import styles from './index.css';
import UserLayout from './UserLayout';

export default function BasicLayout(props) {
  if (props.location.pathname === ('/user/login' || '/user/register')) {
    return <UserLayout>{props.children}</UserLayout>;
  }

  return <div>{props.children}</div>;
}
