import { stringify } from 'qs';
import { addOAuth, oauthPage } from '../services/oauth';
import { net, createAction } from '@/utils';
import { message } from 'antd';

/**
 * 授权action
 */
export default {
  namespace: 'oauth',
  state: {
    oauthList: [],
  },
  effects: {
    // 添加授权
    *addOAuth({ payload, callback }, { call, put }) {
      const response = yield call(addOAuth, payload);
      if (net(response)) {
        callback && callback();
        // 获取授权分页
        yield put(createAction('oauthPage')());
        // 添加成功
        message.success(response.msg);
      }
    },
    // 获取授权分页
    *oauthPage({ payload, callback }, { call, put }) {
      const response = yield call(oauthPage, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ oauthList: response.data }));
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
