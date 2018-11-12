import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { addUser, getUserPage, getBindRole, bindRole } from '../services/user';

export default {
  namespace: 'user',

  state: {
    userList: {},
    pagination: {},
    keys: [],
    roles: [],
  },

  effects: {
    // 添加用户
    *addUser({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      if (net(response)) {
        callback && callback();
        // 添加成功
        message.success(response.msg);
      }
    },
    // 获取用户分页
    *getUserPage({ payload, callback }, { call, put }) {
      const response = yield call(getUserPage, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ userList: response.data }));
      }
    },
    // 获取绑定角色
    *getBindRole({ payload, callback }, { call, put }) {
      const response = yield call(getBindRole, payload);
      if (net(response)) {
        yield put(
          createAction('updateState')({ keys: response.data.keys, roles: response.data.roles })
        );
      }
    },
    // 绑定角色
    *bindRole({ payload, callback }, { call, put }) {
      const response = yield call(bindRole, payload);
      if (net(response)) {
        callback && callback();
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
