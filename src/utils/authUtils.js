import { AUTH } from '@/constants/storage';
import { parse } from 'qs';
import _ from 'lodash';

/**
 * @description 权限按钮资源判断
 * @author jerrychir
 * @param {*} code
 */
function auth(code) {
  // 从本地获取auth
  const auth = parse(localStorage.getItem(AUTH));
  const authKey = _.findKey(auth, { authCode: code });
  return authKey ? true : false;
}

export default { auth };
