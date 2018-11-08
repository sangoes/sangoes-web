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
/**
 * 获取用户分页
 * @param {参数} params
 */
export async function getUserPage(params) {
  return request(`/api/user/page?${stringify(params)}`);
}
