import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { addMenu, getMenuTree, getMenuList } from '../services/menu';
import { getKeys } from '@/utils/utils';

export default {
  namespace: 'menu',

  state: {
    menuTree: [],
    menuList: [],
    openKeys: [],
    selectedKeys: [],
  },

  effects: {
    // 添加菜单
    *addMenu({ payload, callback }, { call, put }) {
      const response = yield call(addMenu, payload);
      if (net(response)) {
        // 获取菜单树形
        yield put(createAction('getMenuTree')());
        callback && callback();
        // 添加成功
        message.success(response.msg);
      }
    },
    // 获取菜单树形
    *getMenuTree({ payload, callback }, { call, put }) {
      const response = yield call(getMenuTree, payload);
      if (net(response)) {
        const { openKeys, selectedKeys } = getKeys(response.data);
        // 获取菜单列表
        yield put(createAction('getMenuList')());
        // 获取菜单对应的权限
        yield put(createAction('auth/getAuthPage')({ menuId: selectedKeys }));
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
    // 获取菜单列表
    *getMenuList({ payload, callback }, { call, put }) {
      const response = yield call(getMenuList, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ menuList: response.data }));
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
