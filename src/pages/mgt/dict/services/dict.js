import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加字典
 * @param  params
 */
export async function addDict(params) {
  return request('/api/admin/dict/add', { method: 'POST', body: params });
}

/**
 * 字典分页
 * @param {参数} params
 */
export async function pageDict(params) {
  return request(`/api/admin/dict/page?${stringify(params)}`);
}

/**
 * 删除字典
 * @param  params
 */
export async function deleteDict(params) {
  return request('/api/admin/dict/delete', {
    method: 'DELETE',
    body: params,
  });
}

/**
 * 批量删除字典
 * @param  params
 */
export async function batchDeleteDict(params) {
  return request('/api/admin/dict/batch/delete', {
    method: 'DELETE',
    body: params,
  });
}
/**
 * 获取字典树形
 * @param {参数} params
 */
export async function dictTree(params) {
  return request(`/api/admin/dict/tree/${params}`);
}

/**
 * 更新字典
 * @param  params
 */
export async function updateDict(params) {
  return request('/api/admin/dict/update', {
    method: 'PUT',
    body: params,
  });
}
