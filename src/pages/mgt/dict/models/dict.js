import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import {
  addDict,
  pageDict,
  batchDeleteDict,
  deleteDict,
  dictTree,
  updateDict,
} from '../services/dict';

export default {
  namespace: 'dict',
  state: {
    // 字典分页结果
    dictPage: {},
    // 字典树形
    dictTree: [],
    // 字典主键
    dictId: '-1',
  },
  effects: {
    // 添加字典
    *addDict({ payload, callback }, { call, put }) {
      const response = yield call(addDict, payload);
      if (net(response)) {
        // 字典分页
        yield put(createAction('pageDict')());
        callback && callback();
        // 添加成功
        message.success(response.msg);
      }
    },
    // 更新字典
    *updateDict({ payload, callback }, { call, put, select }) {
      const response = yield call(updateDict, payload);
      if (net(response)) {
        // 获取字典id
        const dictId = yield select(state => state.dict.dictId);
        // 获取树形
        payload.subDict && (yield put(createAction('dictTree')(dictId)));
        // 字典分页
        yield put(createAction('pageDict')());
        callback && callback();
        // 添加成功
        message.success(response.msg);
      }
    },
    // 字典分页
    *pageDict({ payload, callback }, { call, put }) {
      const response = yield call(pageDict, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ dictPage: response.data }));
      }
    },
    // 删除字典
    *deleteDict({ payload, callback }, { call, put, select }) {
      const response = yield call(deleteDict, payload);
      if (net(response)) {
        callback && callback();
        // 获取字典id
        const dictId = yield select(state => state.dict.dictId);
        // 获取字典分页
        yield put(createAction('pageDict')());
        // 获取字典树形
        yield put(createAction('dictTree')(dictId));
        // 删除成功
        message.success(response.msg);
      }
    },
    // 批量删除字典
    *batchDeleteDict({ payload, callback }, { call, put }) {
      const response = yield call(batchDeleteDict, payload);
      if (net(response)) {
        callback && callback();
        // 获取字典分页
        yield put(createAction('pageDict')());
        // 删除成功
        message.success(response.msg);
      }
    },
    // 字典树形
    *dictTree({ payload, callback }, { call, put }) {
      const response = yield call(dictTree, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ dictTree: response.data, dictId: payload }));
        callback && callback();
      }
    },
    // 添加子字典
    *addSubDict({ payload, callback }, { call, put, select }) {
      const response = yield call(addDict, payload);
      if (net(response)) {
        // 获取字典id
        const dictId = yield select(state => state.dict.dictId);
        // 字典树形
        yield put(createAction('dictTree')(dictId));
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
