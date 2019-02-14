import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 发送消息
 * @param {*} params
 */
export async function sendMsg(params) {
  return request('/api/msg/center/send', {
    method: 'POST',
    body: params,
  });
}

// export async function addUser(params) {
//   return request('/api/admin/user/add', { method: 'POST', body: params });
// }
