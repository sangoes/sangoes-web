import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login } from '../services/login';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call }) {
      yield call(login, payload);
    },
  },

  reducers: {},
};
