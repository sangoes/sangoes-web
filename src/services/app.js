import { stringify } from 'qs';
import request from '@/utils/request';

/**
 * 获取验证码并且获取公钥
 * @param {手机号码} mobile
 */
export async function getRegisterCaptcha(mobile) {
  return request(`/api/captcha/sms/${mobile}`);
}
/**
 * 根据随机数获取公钥
 * @param {随机数} random
 */
export async function getPublicKeyByRandom(random) {
  return request(`/api/encrypt/rsa/${random}`);
}
