import { stringify } from 'qs';
import request from 'utils/request';

/**
 *
 * @param {*} params
 */
export async function login(params) {
  return request('/api/user/signin/mobile', {
    method: 'POST',
    // headers: {
    //   Authorization:
    //     'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZXJyeWNoaXIiLCJpYXQiOjE1NDEzOTEwMDMsImV4cCI6MTU0MTM5NDYwM30.qCzogQZa3DpWUiRdsNufs6rbK3wsCeii1PwWZbk5_Ac',
    // },
    body: params,
  });
}
