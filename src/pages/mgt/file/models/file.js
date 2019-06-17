import * as services from '../services/file';
import { net, createAction } from '@/utils';

/**
 * 文件上传
 */
export default {
  namespace: 'file',

  state: {
    filePage: {},
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    *uploadFile({ payload }, { call, put }) {
      const response = yield call(services.uploadFile, payload);
      if (net(response)) {
      }
    },
    // 字典分页
    *pageFile({ payload, callback }, { call, put }) {
      const response = yield call(services.pageFile, payload);
      if (net(response)) {
        yield put(createAction('save')({ filePage: response.data }));
      }
    },
  },

  subscriptions: {},
};
