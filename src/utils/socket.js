/**
 * @description web socket
 * @author jerrychir
 * @export
 * @class WebSocket
 */
export default class Socket {
  constructor(url) {
    this.url = url;
    this.ws = null;
  }
  /**
   * 单列
   * @param {*} url
   */
  static getInstance(url) {
    if (!this.ws || url !== this.url) {
      this.ws = new WebSocket(url);
      this.url = url;
    }
    return this.ws;
  }
  // 设置
  static _setUpSocket = ws => {
    ws.onclose = () => {
      console.log('open');
    };
  };
  connect = () => {};
}
