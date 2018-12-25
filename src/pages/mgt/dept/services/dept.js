import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加部门
 * @param  params
 */
export async function addDepart(params) {
  return request('/api/admin/depart/add', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取部门树形
 * @param {参数} params
 */
export async function getDepartTree(params) {
  return request('/api/admin/depart/tree');
}

/**
 * 更新部门
 * @param  params
 */
export async function updateDepart(params) {
  return request('/api/admin/depart/update', {
    method: 'PUT',
    body: params,
  });
}

/**
 * 删除部门
 * @param  params
 */
export async function deleteDepart(params) {
  return request('/api/admin/depart/delete', {
    method: 'DELETE',
    body: params,
  });
}
