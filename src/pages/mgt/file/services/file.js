import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 上传文件
 * @param  params
 */
export async function uploadFile(params) {
  return request('/api/admin/file/upload', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * 文件分页
 * @param {参数} params
 */
export async function pageFile(params) {
  return request(`/api/admin/file/page?${stringify(params)}`);
}
