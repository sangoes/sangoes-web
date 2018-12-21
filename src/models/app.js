import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import {
  getRegisterCaptcha,
  getPublicKeyByRandom,
  getImageCaptcha,
  getUserMenu,
  getUserInfo,
  logout,
} from '../services/app';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { getKeys } from '@/utils/utils';

export default {
  namespace: 'app',

  state: {
    collapsed: false,
    status: undefined,
    publicKey: '',
    imgCaptcha: '',
    userInfo: {},
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
      const response = yield call(logout, payload);
      if (net(response)) {
        // 清空session
        sessionStorage.removeItem('access_token');
        // 重定向login
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
    // 获取当前用户的菜单树形结果
    *getUserMenu({ payload, callback }, { call, put }) {
      const response = yield call(getUserMenu, payload);
      if (net(response)) {
        const { openKeys, selectedKeys } = getKeys(response.data);
        // 保存state
        yield put(
          createAction('updateState')({
            menuTree: response.data,
            openKeys: openKeys,
            selectedKeys: [selectedKeys],
          })
        );
        // 成功返回
        callback && callback();
      }
    },
    // 获取当前用户信息
    *getUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(getUserInfo, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ userInfo: response.data }));
        // 成功返回
        callback && callback();
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
