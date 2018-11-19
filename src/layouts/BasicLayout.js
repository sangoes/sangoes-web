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

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

@connect(({ app }) => ({
  ...app,
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
      createActions('app/getUserMenu')()(() => {
        const { openKeys, selectedKeys } = this.props;
        this.setState({ openKeys: openKeys, selectedKeys: selectedKeys });
      })
    );
    // 获取当前用户
    this.props.dispatch(createAction('app/getUserInfo')());
  }

  componentDidUpdate(preProps) {}

  componentWillUnmount() {}

  // 菜单选中
  _onMenuSelect = ({ item, key, selectedKeys }) => {
    this.setState({ selectedKeys });
  };
  render() {
    const { menuTree, userInfo } = this.props;
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
            link={true}
            menuData={menuTree}
            openKeys={openKeys}
            selectedKeys={selectedKeys}
            onSelect={this._onMenuSelect}
          />
        </Sider>
        <Layout>
          {/* 头部 */}
          <Header style={{ padding: 0 }}>
            <GlobalHeader currentUser={userInfo} {...this.props} />
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
