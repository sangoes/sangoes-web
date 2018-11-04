import { stringify } from 'qs';
import request from 'utils/request';

/**
 *
 * @param {*} params
 */
export async function login(params) {
  return request('/api/user/signin/mobile', {
    method: 'POST',
    body: params,
  });
}
