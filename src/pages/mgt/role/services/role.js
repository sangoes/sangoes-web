import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加角色
 * @param  params
 */
export async function addRole(params) {
  return request('/api/role/add', {
    method: 'POST',
    body: params,
  });
}
/**
 * 获取角色分页
 * @param {参数} params
 */
export async function getRolePage(params) {
  return request(`/api/role/page?${stringify(params)}`);
}
