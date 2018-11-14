import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { addRole, getRolePage, getBindMenu, getBindAuth } from '../services/role';
import { getKeys } from '@/utils/utils';

export default {
  namespace: 'role',

  state: {
    roleList: {},
    menuKeys: [],
    menus: [],
    selectedKeys: [],
    expandedKeys: [],
    authKeys: [],
    auths: [],
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
    // 获取绑定菜单
    *getBindMenu({ payload, callback }, { call, put }) {
      const response = yield call(getBindMenu, payload);
      if (net(response)) {
        // 获取
        const { openKeys, selectedKeys } = getKeys(response.data.menus);
        // 获取权限
        yield put(createAction('getBindAuth')({ roleId: payload, menuId: selectedKeys }));
        // 更新props
        yield put(
          createAction('updateState')({
            menuKeys: response.data.menuKeys,
            menus: response.data.menus,
            selectedKeys: [selectedKeys],
            expandedKeys: openKeys,
          })
        );
      }
    },
    // 获取绑定权限
    *getBindAuth({ payload, callback }, { call, put }) {
      const response = yield call(getBindAuth, payload);
      if (net(response)) {
        yield put(
          createAction('updateState')({
            auths: response.data.auths,
            authKeys: response.data.authKeys,
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
