import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, loginAccount } from '../services/login';
import { net } from '@/utils';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    token: '',
  },

  effects: {
    *loginMobile({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (net(response)) {
        //删除旧的token
        sessionStorage.removeItem('access_token');
        //登录成功
        message.success(response.msg);
        //保存 token
        sessionStorage.setItem('access_token', response.data);
        //调整首页
        yield put(
          routerRedux.push({
            pathname: '/',
          })
        );
      }
    },
    *loginAccount({ payload }, { call, put }) {
      const response = yield call(loginAccount, payload);
      if (net(response)) {
        //删除旧的token
        sessionStorage.removeItem('access_token');
        //登录成功
        message.success('登录成功');
        //保存 token
        sessionStorage.setItem('access_token', stringify(response.data));
        //调整首页
        yield put(
          routerRedux.push({
            pathname: '/',
          })
        );
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
