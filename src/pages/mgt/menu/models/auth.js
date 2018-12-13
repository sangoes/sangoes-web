import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { addAuth, getAuthPage, updateAuth, deleteAuth } from '../services/auth';

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
        // 获取权限分页
        const { menuId } = payload;
        yield put(createAction('getAuthPage')({ menuId }));
        // 添加成功
        message.success(response.msg);
      }
    },
    // 获取权限分页
    *getAuthPage({ payload, callback }, { call, put }) {
      const response = yield call(getAuthPage, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ authList: response.data }));
      }
    },
    // 更新权限
    *updateAuth({ payload, callback }, { call, put }) {
      const response = yield call(updateAuth, payload);
      if (net(response)) {
        callback && callback();
        // 获取权限分页
        const { menuId } = payload;
        yield put(createAction('getAuthPage')({ menuId }));
        // 添加成功
        message.success(response.msg);
      }
    },
    // 删除权限
    *deleteAuth({ payload, callback }, { call, put }) {
      const response = yield call(deleteAuth, payload);
      if (net(response)) {
        callback && callback();
        // 获取权限分页
        const { menuId } = payload;
        yield put(createAction('getAuthPage')({ menuId }));
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
