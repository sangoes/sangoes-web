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

/**
 * 获取绑定菜单
 * @param {参数} params
 */
export async function getBindMenu(params) {
  return request(`/api/role/bind/menu/info/${params}`);
}
/**
 * 获取绑定权限
 * @param {参数} params
 */
export async function getBindAuth(params) {
  return request(`/api/role/bind/auth/info/${params.roleId}/${params.menuId}`);
}

/**
 * 绑定菜单权限
 * @param  params
 */
export async function bindMenuAuth(params) {
  return request('/api/role/bind/menu', {
    method: 'POST',
    body: params,
  });
}
