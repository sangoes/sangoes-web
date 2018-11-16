import { stringify } from 'qs';
import request from 'utils/request';

/**
 * 手机登录
 * @param {*} params
 */
export async function login(params) {
  return request('/api/admin/user/signin/mobile', {
    method: 'POST',
    headers: {
      Authorization: 'Basic c2FuZ29lczpzYW5nb2Vz',
    },
    body: params,
  });
}
/**
 * 账户登录
 * @param {参数} params
 */
export async function loginAccount(params) {
  return request('/api/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic c2FuZ29lczpzYW5nb2Vz',
    },
    body: params,
  });
}
