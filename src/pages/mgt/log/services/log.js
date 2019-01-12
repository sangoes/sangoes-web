import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取日志分页
 * @param {参数} params
 */
export async function logPage(params) {
  return request(`/api/admin/log/page?${stringify(params)}`);
}
