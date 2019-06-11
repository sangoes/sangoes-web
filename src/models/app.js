import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import * as services from '../services/app';
import { createAction, net } from '@/utils';
import { message } from 'antd';
import { getKeys } from '@/utils/utils';
import { AUTH } from '@/constants/storage';

export default {
  namespace: 'app',

  state: {
    collapsed: false,
    status: undefined,
    publicKey: '',
    imgCaptcha: '',
    userInfo: {},
    menuTree: [],
    openKeys: [],
    selectedKeys: [],
    // 字典树形(根据dictKey查询)
    treeDict: [],
    // 字典列表(根据dictKey查询)
    listDict: [],
    // 消息
    msgData: {},
    // 通知
    notifData: {},
    // 待办
    agendaData: {},
  },

  effects: {
    *getRegisterCaptcha({ payload }, { call, put }) {
      const response = yield call(services.getRegisterCaptcha, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ publicKey: response.data }));
      }
    },
    *getPublicKeyByRandom({ payload }, { call, put }) {
      const response = yield call(services.getPublicKeyByRandom, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ publicKey: response.data }));
      }
    },
    // 获取图片验证码
    *getImageCaptcha({ payload }, { call, put }) {
      const response = yield call(services.getImageCaptcha, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ imgCaptcha: response }));
      }
    },
    // 退出
    *logout({ payload }, { call, put }) {
      const response = yield call(services.logout, payload);
      if (net(response)) {
        // 注销成功
        message.success(response.msg);
        // 清空session
        sessionStorage.removeItem('access_token');
        // 重定向login
        yield put(
          routerRedux.push({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
    // 获取当前用户的菜单树形结果
    *getUserMenu({ payload, callback }, { call, put }) {
      const response = yield call(services.getUserMenu, payload);
      if (net(response)) {
        const { openKeys, selectedKeys } = getKeys(response.data);
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
    // 获取当前用户信息
    *getUserInfo({ payload, callback }, { call, put }) {
      const response = yield call(services.getUserInfo, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ userInfo: response.data }));
        // TODO 保存在本地
        if (response.data) {
          localStorage.setItem(AUTH, stringify(response.data.auth));
        }
        // 成功返回
        callback && callback();
      }
    },
    // 根据dictKey获取字典树形
    *treeDict({ payload, callback }, { call, put }) {
      const response = yield call(services.treeDict, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ treeDict: response.data }));
        // 成功返回
        callback && callback();
      }
    },
    // 根据dictKey获取字典列表
    *listDict({ payload, callback }, { call, put }) {
      const response = yield call(services.listDict, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ listDict: response.data }));
        // 成功返回
        callback && callback();
      }
    },
    // 获取通知信息
    *getMsgNotice({ payload, callback }, { call, put }) {
      const response = yield call(services.getMsgNotice, payload);
      if (net(response)) {
        const { type } = payload;
        switch (type) {
          // 消息
          case 1:
            yield put(createAction('updateState')({ msgData: response.data }));
            break;
          // 通知
          case 2:
            yield put(createAction('updateState')({ notifData: response.data }));
            break;
          // 待办
          case 3:
            yield put(createAction('updateState')({ agendaData: response.data }));
            break;

          default:
            break;
        }
        // 成功返回
        callback && callback();
      }
    },
    // 修改密码
    *changePwd({ payload, callback }, { call, put }) {
      const response = yield call(services.changePwd, payload);
      if (net(response)) {
        // 添加成功
        message.success(response.msg);
        // 成功返回
        callback && callback();
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
