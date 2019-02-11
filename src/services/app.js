import { stringify } from 'qs';
import request from '@/utils/request';

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
 * 根据随机数获取公钥
 * @param {随机数} random
 */
export async function getPublicKeyByRandom(random) {
  return request(`/api/encrypt/rsa/${random}`, {
    headers: {
      Authorization: 'Basic c2FuZ29lczpzYW5nb2Vz',
    },
  });
}

/**
 * 获取随机验证码 返回验证码图片
 * @param {随机数} random
 */
export async function getImageCaptcha(random) {
  return request(`/api/captcha/image/${random}`, {
    headers: {
      Authorization: 'Basic c2FuZ29lczpzYW5nb2Vz',
    },
  });
}

/**
 * 获取当前用户的菜单树形结果
 * @param {参数} params
 */
export async function getUserMenu(params) {
  return request('/api/admin/menu/user/tree');
}

/**
 * 获取当前用户信息
 * @param {参数} params
 */
export async function getUserInfo(params) {
  return request('/api/admin/user/info');
}

/**
 * 注销登录
 * @param
 */
export async function logout() {
  return request(`/api/admin/user/logout`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Basic c2FuZ29lczpzYW5nb2Vz',
    },
  });
}

/**
 * 根据dictKey获取字典树形
 * @param {dictKey} params
 */
export async function treeDict(params) {
  return request(`/api/admin/dict/one/tree/${params}`);
}

/**
 * 根据dictKey获取字典列表
 * @param {dictKey} params
 */
export async function listDict(params) {
  return request(`/api/admin/dict/one/list/${params}`);
}

