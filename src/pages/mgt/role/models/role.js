import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { addRole, getRolePage } from '../services/role';

export default {
  namespace: 'role',

  state: {
    roleList: {},
  },

  effects: {
    // 添加角色
    *addRole({ payload, callback }, { call, put }) {
      const response = yield call(addRole, payload);
      if (net(response)) {
        callback && callback();
        // 添加成功
        message.success(response.msg);
      }
    },
    // 获取角色分页
    *getRolePage({ payload, callback }, { call, put }) {
      const response = yield call(getRolePage, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ roleList: response.data }));
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
