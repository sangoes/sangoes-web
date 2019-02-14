import * as services from '../services';
import { net } from '@/utils';
import { message } from 'antd';

/**
 * msg
 */
export default {
  namespace: 'msg',

  state: {},

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    // 发送消息
    *sendMsg({ payload, callback }, { call, put }) {
      const response = yield call(services.sendMsg, payload);
      if (net(response)) {
        // 成功返回
        callback && callback();
        // 发送成功
        message.success(response.msg);
      }
    },
  },

  subscriptions: {
    init({ dispatch }) {},
  },
};
