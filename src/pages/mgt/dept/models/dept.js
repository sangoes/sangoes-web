import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { getDepartTree, addDepart, updateDepart, deleteDepart } from '../services/dept';
import { getKeys } from '@/utils/utils';

export default {
  namespace: 'dept',
  state: {
    departTree: [],
    openKeys: [],
    selectedKeys: [],
  },
  effects: {
    // 添加部门
    *addDepart({ payload, callback }, { call, put }) {
      const response = yield call(addDepart, payload);
      if (net(response)) {
        // 获取部门树形
        yield put(createAction('getDepartTree')());
        callback && callback();
        // 添加成功
        message.success(response.msg);
      }
    },
    // 获取部门树形
    *getDepartTree({ payload, callback }, { call, put }) {
      const response = yield call(getDepartTree, payload);
      if (net(response)) {
        // 获取openKeys selectedKeys
        const { openKeys, selectedKeys } = getKeys(response.data);
        // 结果保存
        yield put(
          createAction('updateState')({
            departTree: response.data,
            openKeys: openKeys,
            selectedKeys: [selectedKeys],
          })
        );
        // 成功返回
        callback && callback();
      }
    },
    // 更新部门
    *updateDepart({ payload, callback }, { call, put }) {
      const response = yield call(updateDepart, payload);
      if (net(response)) {
        // 获取部门树形
        yield put(createAction('getDepartTree')());
        callback && callback();
        // 更新成功
        message.success(response.msg);
      }
    },
    // 删除部门
    *deleteDepart({ payload, callback }, { call, put }) {
      const response = yield call(deleteDepart, payload);
      if (net(response)) {
        // 获取部门树形
        yield put(createAction('getDepartTree')());
        // 删除成功
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
