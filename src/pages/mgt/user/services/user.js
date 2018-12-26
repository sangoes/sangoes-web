import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加用户
 * @param  params
 */
export async function addUser(params) {
  return request('/api/admin/user/add', { method: 'POST', body: params });
}
/**
 * 获取用户分页
 * @param {参数} params
 */
export async function getUserPage(params) {
  return request(`/api/admin/user/page?${stringify(params)}`);
}

/**
 * 获取绑定角色
 * @param {参数} params
 */
export async function getBindRole(params) {
  return request(`/api/admin/user/bind/role/info/${params}`);
}
/**
 * 绑定角色
 * @param  params
 */
export async function bindRole(params) {
  return request('/api/admin/user/bind/role', { method: 'POST', body: params });
}
/**
 * 删除用户
 * @param  params
 */
export async function deleteUser(params) {
  return request('/api/admin/user/delete', {
    method: 'DELETE',
    body: params,
  });
}

/**
 * 更新用户
 * @param  params
 */
export async function updateUser(params) {
  return request('/api/admin/user/update', {
    method: 'PUT',
    body: params,
  });
}

/**
 * 批量删除用户
 * @param  params
 */
export async function batchDeleteUser(params) {
  return request('/api/admin/user/batch/delete', {
    method: 'DELETE',
    body: params,
  });
}

/**
 * 获取绑定部门树形
 * @param {参数} params
 */
export async function treeBindDepart(params) {
  return request(`/api/admin/user/bind/depart/${params}`);
}

/**
 * 绑定部门
 * @param  params
 */
export async function bindDepart(params) {
  return request('/api/admin/user/bind/depart', { method: 'POST', body: params });
}
