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
