import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './BasicLayout.less';
import GlobalHeader from '@/components/GlobalHeader';
import Footer from './Footer';
import Link from 'umi/link';
import Context from './MenuContext';
import { connect } from 'dva';
import { createActions, createAction } from '@/utils';
import BaseMenu from '@/components/BaseMenu';
import router from 'umi/router';
import * as action from '@/action/app';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

@connect(({ app, routing, loading }) => ({
  ...app,
  ...routing,
  menuLoading: loading.effects[action.USER_MENU],
  noticeLoading: loading.effects[action.MSG_NOTICE],
}))
export default class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { collapsed: false, openKeys: [], selectedKeys: [] };
  }
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  componentDidMount() {
    // 获取侧边栏菜单
    this.props.dispatch(
      createActions(action.USER_MENU)()(() => {
        const { openKeys, selectedKeys } = this.props;
        this.setState({ openKeys: openKeys, selectedKeys: selectedKeys });
      })
    );
    // 获取当前用户
    this.props.dispatch(createAction(action.USER_INFO)());
  }

  componentDidUpdate(preProps) {}

  componentWillUnmount() {}

  // 菜单选中
  _onMenuSelect = ({ item, key, selectedKeys }) => {
    this.setState({ selectedKeys });
  };
  // 下拉菜单
  _handleMenuClick = ({ key }) => {
    switch (key) {
      // 个人中心
      case 'userCenter':
        router.push('/account/center');
        break;
      // 个人设置
      case 'userSetting':
        router.push('/account/setting');
        break;
      case 'logout':
        // 退出登录
        this.props.dispatch(createAction('app/logout')());
        break;
      default:
        break;
    }
  };
  /**
   * @description 点击通知按钮回调
   * @memberof BasicLayout
   */
  _onNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch(createAction(action.MSG_NOTICE)({ type: 1 }));
      this.props.dispatch(createAction(action.MSG_NOTICE)({ type: 2 }));
      this.props.dispatch(createAction(action.MSG_NOTICE)({ type: 3 }));
    }
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof BasicLayout
   */
  render() {
    const {
      menuTree,
      userInfo,
      location,
      menuLoading,
      noticeLoading,
      msgData,
      notifData,
      agendaData,
    } = this.props;
    const { openKeys, selectedKeys } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo} id="logo">
            <Link to="/">
              {/* TODO: logo */}
              {/* <img src={logo} alt="logo" /> */}
              <h1>Sangoes Web</h1>
            </Link>
          </div>
          {/* 菜单 */}
          <BaseMenu
            loading={menuLoading}
            link={true}
            menuData={menuTree}
            location={location}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onSelect={this._onMenuSelect}
          />
        </Sider>
        <Layout>
          {/* 头部 */}
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              currentUser={userInfo}
              onMenuClick={this._handleMenuClick}
              onNoticeVisibleChange={this._onNoticeVisibleChange}
              fetchingNotices={noticeLoading}
              msgData={msgData}
              notifData={notifData}
              agendaData={agendaData}
              {...this.props}
            />
          </Header>
          {/* 内容 */}
          <Content>{this.props.children}</Content>
          {/* 尾部 */}
          <Footer />
        </Layout>
      </Layout>
    );
  }
}
