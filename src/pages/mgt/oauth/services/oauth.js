import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加授权
 * @param  params
 */
export async function addOAuth(params) {
  return request('/api/admin/oauth/add', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取授权分页
 * @param {参数} params
 */
export async function oauthPage(params) {
  return request(`/api/admin/oauth/page?${stringify(params)}`);
}

/**
 * 删除授权
 * @param  params
 */
export async function deleteOAuth(params) {
  return request('/api/admin/oauth/delete', {
    method: 'DELETE',
    body: params,
  });
}

/**
 * 批量删除授权
 * @param  params
 */
export async function batchDeleteOAuth(params) {
  return request('/api/admin/oauth/batch/delete', {
    method: 'DELETE',
    body: params,
  });
}

/**
 * 更新授权
 * @param  params
 */
export async function updateOAuth(params) {
  return request('/api/admin/oauth/update', {
    method: 'PUT',
    body: params,
  });
}
