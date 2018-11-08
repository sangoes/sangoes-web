import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { addUser } from '../services/user';

export default {
  namespace: 'user',

  state: {},

  effects: {
    // 添加用户
    *addUser({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      if (net(response)) {
        callback && callback();
        // 添加成功
        message.success(response.msg);
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
