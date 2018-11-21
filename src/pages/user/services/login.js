import { stringify } from 'qs';
import request from 'utils/request';

/**
 * 登录
 * @param {参数} params
 */
export async function login(params) {
  return request('/api/signin', {
    method: 'POST',
    headers: {
      Authorization: 'Basic c2FuZ29lczpzYW5nb2Vz',
    },
    body: params,
  });
}
