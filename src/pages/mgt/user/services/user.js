import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加用户
 * @param  params
 */
export async function addUser(params) {
  return request('/api/user/add', {
    method: 'POST',
    body: params,
  });
}
