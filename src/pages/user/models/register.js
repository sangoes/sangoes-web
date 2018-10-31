import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getRegisterCaptcha } from '../services/register';
import { createAction } from '@/utils';

export default {
  namespace: 'register',

  state: {
    status: undefined,
    publicKey: null,
  },

  effects: {
    *getRegisterCaptcha({ payload }, { call, put }) {
      const response = yield call(getRegisterCaptcha, payload);
      console.log(response);
      response &&
        response.code == 200 &&
        (yield put(createAction('updateState')({ publicKey: response.data })));
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
