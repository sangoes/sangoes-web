import { createAction } from '@/utils';
import Socket from '@/utils/socket';
import * as service from '../services/msg';
import { parse } from 'qs';
/**
 * 消息类
 */
export default {
  namespace: 'msg',

  state: {
    wsMsg: WebSocket,
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    // Socket链接消息
    *socketMsg({ payload }, { call, put }) {
      const ws = yield call(service.socketMsg, payload);
      ws.onopen = () => {
        console.log('ws open');
      };
      ws.onmessage = msg => {
        console.log('ws onmessage', msg);
      };
      ws.onclose = () => {
        console.log('ws close');
      };
      ws.onerror = () => {};
      // 保存ws
      yield put(createAction('save')({ wsMsg: ws }));
    },
  },

  subscriptions: {
    init({ dispatch }) {
      // 获取token
      const token = sessionStorage.getItem('access_token');
      if (token) {
        const access_token = parse(token).value;
        dispatch(createAction('socketMsg')({ token: access_token }));
      }
    },
  },
};
