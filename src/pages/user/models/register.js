import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getRegisterCaptcha, register } from '../services/register';
import { createAction, net } from '@/utils';

export default {
  namespace: 'register',

  state: {
    status: undefined,
    publicKey: '',
  },

  effects: {
    *getRegisterCaptcha({ payload }, { call, put }) {
      const response = yield call(getRegisterCaptcha, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ publicKey: response.data }));
      }
    },
    *submit({ payload }, { call, put }) {
      const response = yield call(register, payload);
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
