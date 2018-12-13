import fetch from 'dva/fetch';
import { message } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { stringify, parse } from 'qs';
// import { isAntdPro } from './utils';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
// 非json返回
const preCheckStatus = response => {
  // 不拦截
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // 拦截非json返回
  // 格式化text
  const msg = codeMessage[response.status] || response.msg;
  // 错误
  const error = new Error(msg);
  error.name = response.status;
  error.msg = msg;
  error.response = response;
  throw error;
};
// json返回
const CheckStatus = response => {
  // 不拦截
  if ((response.code >= 200 && response.code < 300) || response.access_token) {
    return response;
  }

  // 格式化text
  const msg = response.msg || codeMessage[response.code] || response.error_description;
  // message
  message.warning(msg);
  // 错误
  const error = new Error(msg);
  error.name = response.code;
  error.msg = msg;
  error.response = response;
  throw error;
};

/**
 * 请求主体
 *
 * @param  {string} url 请求路径
 * @param  {object} [option]
 * @return {object}
 */
export default function request(url, option) {
  const options = {
    ...option,
  };
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  // 获取token
  const token = sessionStorage.getItem('access_token');
  if (token) {
    const access_token = parse(token).value;
    newOptions.headers = { Authorization: `Bearer ${access_token}` };
  }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  return fetch(url, newOptions)
    .then(preCheckStatus)
    .then(response => {
      return response.json();
    })
    .then(CheckStatus)
    .catch(e => {
      const status = e.name;

      const msg = e.msg;

      // 请求失败
      // if (status === 400) {
      //   message.warning(msg);
      //   return;
      // }

      if (status === 401) {
        // 退出登录
        window.g_app._store.dispatch({ type: 'app/logout' });
        return;
      }
      // 禁止访问
      if (status === 403) {
        router.push('/exception/403');
        return;
      }
      // 内部错误
      if (status <= 504 && status >= 500) {
        router.push('/exception/500');
        return;
      }
      // 没有找到
      if (status === 404) {
        router.push('/exception/404');
      }
    });
}
