import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getSmsCaptcha } from '../services/register';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *getRegisterCaptcha({ payload }, { call }) {
      yield call(getSmsCaptcha, payload);
    },
  },

  reducers: {},
};
