/**
 * 统一处理action
 * @param {*} type
 */
export const createAction = type => payload => ({ type, payload });
/**
 * 统一处理action
 * @param {*} type
 */
export const createActions = type => payload => callback => ({ type, payload, callback });
/**
 * 网络请求
 */
export { default as request } from './request';
/**
 * 网络检查
 * @param {*} response
 */
export const net = response => response && response.code == 200;
/**
 * react 工具
 */
export { default as reactUtils } from './reactUtils';
