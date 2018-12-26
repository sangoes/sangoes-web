import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import {
  addUser,
  getUserPage,
  getBindRole,
  bindRole,
  deleteUser,
  updateUser,
  batchDeleteUser,
  treeBindDepart,
  bindDepart,
} from '../services/user';

export default {
  namespace: 'user',

  state: {
    userList: {},
    pagination: {},
    keys: [],
    roles: [],
    departTrees: [],
    departKeys: [],
  },

  effects: {
    // 添加用户
    *addUser({ payload, callback }, { call, put }) {
      const response = yield call(addUser, payload);
      if (net(response)) {
        callback && callback();
        // 添加成功
        message.success(response.msg);
        // 获取用户分页
        yield put(createAction('getUserPage')());
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
        // 返回成功
        callback && callback();
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
    // 删除用户
    *deleteUser({ payload, callback }, { call, put }) {
      const response = yield call(deleteUser, payload);
      if (net(response)) {
        callback && callback();
        // 获取用户分页
        yield put(createAction('getUserPage')());
        // 删除成功
        message.success(response.msg);
      }
    },
    // 批量删除用户
    *batchDeleteUser({ payload, callback }, { call, put }) {
      const response = yield call(batchDeleteUser, payload);
      if (net(response)) {
        callback && callback();
        // 获取用户分页
        yield put(createAction('getUserPage')());
        // 批量删除成功
        message.success(response.msg);
      }
    },
    // 更新用户
    *updateUser({ payload, callback }, { call, put }) {
      const response = yield call(updateUser, payload);
      if (net(response)) {
        callback && callback();
        // 获取用户分页
        yield put(createAction('getUserPage')());
        // 更新成功
        message.success(response.msg);
      }
    },
    // 获取绑定树形部门
    *treeBindDepart({ payload, callback }, { call, put }) {
      const response = yield call(treeBindDepart, payload);
      if (net(response)) {
        yield put(
          createAction('updateState')({
            departKeys: response.data.keys,
            departTrees: response.data.trees,
          })
        );
        // 返回成功
        callback && callback();
      }
    },
    // 绑定部门
    *bindDepart({ payload, callback }, { call, put }) {
      const response = yield call(bindDepart, payload);
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
