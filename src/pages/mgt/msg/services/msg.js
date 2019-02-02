import { stringify } from 'qs';

/**
 * Socket链接消息
 * @param {*} params
 */
export async function socketMsg(params) {
  return new WebSocket(`ws://127.0.0.1:9191/web/msg?${stringify(params)}`);
}
