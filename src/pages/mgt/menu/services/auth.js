import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加权限
 * @param  params
 */
export async function addAuth(params) {
  return request('/api/admin/auth/add', { method: 'POST', body: params });
}

/**
 * 获取权限分页
 * @param {参数} params
 */
export async function getAuthPage(params) {
  return request(`/api/admin/auth/page?${stringify(params)}`);
}

/**
 * 更新权限
 * @param  params
 */
export async function updateAuth(params) {
  return request('/api/admin/auth/update', { method: 'PUT', body: params });
}

/**
 * 删除权限
 * @param  params
 */
export async function deleteAuth(params) {
  return request('/api/admin/auth/delete', { method: 'DELETE', body: params });
}
