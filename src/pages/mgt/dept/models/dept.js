import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';

export default {
  namespace: 'dept',
  state: {},
  effects: {},
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
