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
