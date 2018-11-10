import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加菜单
 * @param  params
 */
export async function addMenu(params) {
  return request('/api/menu/add', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取菜单树形
 * @param {参数} params
 */
export async function getMenuTree(params) {
  return request('/api/menu/tree');
}

/**
 * 获取菜单列表
 * @param {参数} params
 */
export async function getMenuList(params) {
  return request('/api/menu/list');
}
