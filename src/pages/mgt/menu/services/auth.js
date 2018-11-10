import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加权限
 * @param  params
 */
export async function addAuth(params) {
  return request('/api/auth/add', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取权限分页
 * @param {参数} params
 */
export async function getAuthPage(params) {
  return request(`/api/auth/page?${stringify(params)}`);
}
