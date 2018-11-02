/**
 * 统一处理action
 * @param {*} type
 */
export const createAction = type => payload => ({ type, payload });
/**
 * 网络请求
 */
export { default as request } from './request';

export const net = response => response && response.code == 200;
