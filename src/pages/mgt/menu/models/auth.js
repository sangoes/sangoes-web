import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { addAuth } from '../services/auth';

export default {
  namespace: 'auth',

  state: {
    authList: [],
  },

  effects: {
    // 添加权限
    *addAuth({ payload, callback }, { call, put }) {
      const response = yield call(addAuth, payload);
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
