import { logPage } from '../services/log';
import { net, createAction } from '@/utils';

export default {
  namespace: 'log',

  state: {
    logList: {},
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    // 日志分页
    *logPage({ payload }, { call, put }) {
      const response = yield call(logPage, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ logList: response.data }));
      }
    },
  },

  subscriptions: {},
};
