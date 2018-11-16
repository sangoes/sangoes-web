import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getRegisterCaptcha, getPublicKeyByRandom, getImageCaptcha } from '../services/app';
import { createAction, net } from '@/utils';
import { message } from 'antd';

export default {
  namespace: 'app',

  state: {
    collapsed: false,
    status: undefined,
    publicKey: '',
    imgCaptcha: '',
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
    // 获取图片验证码
    *getImageCaptcha({ payload }, { call, put }) {
      const response = yield call(getImageCaptcha, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ imgCaptcha: response }));
      }
    },
    // 退出
    *logout({ payload }, { call, put }) {
      // 清空session
      sessionStorage.removeItem('access_token');
      // TODO网络清除
      // 重定向login
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
