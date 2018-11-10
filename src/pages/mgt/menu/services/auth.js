import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 添加权限
 * @param  params
 */
export async function addAuth(params) {
  return request('/api/auth/add', {
    method: 'POST',
    body: params,
  });
}
