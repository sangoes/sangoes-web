import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getRegisterCaptcha, getPublicKeyByRandom } from '../services/app';
import { createAction, net } from '@/utils';
import { message } from 'antd';

export default {
  namespace: 'app',

  state: {
    collapsed: false,
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
    *getPublicKeyByRandom({ payload }, { call, put }) {
      const response = yield call(getPublicKeyByRandom, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ publicKey: response.data }));
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
