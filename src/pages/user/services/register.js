import { stringify } from 'qs';
import request from 'utils/request';

/**
 * 获取验证码并且获取公钥
 * @param {手机号码} mobile
 */
export async function getRegisterCaptcha(mobile) {
  return request(`/api/captcha/sms/${mobile}`, {
    headers: {
      Authorization: 'Basic c2FuZ29lczpzYW5nb2Vz',
    },
  });
}

/**
 *
 * @param {*} params
 */
export async function register(params) {
  return request('/api/admin/user/signup', {
    method: 'POST',
    headers: {
      Authorization: 'Basic c2FuZ29lczpzYW5nb2Vz',
    },
    body: params,
  });
}
