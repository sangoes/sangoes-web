import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './BasicLayout.less';
import GlobalHeader from '@/components/GlobalHeader';
import SiderMenu from '@/components/SiderMenu';
import Footer from './Footer';
import Link from 'umi/link';
import Context from './MenuContext';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

export default class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  state = { collapsed: false };
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  componentDidMount() {}

  componentDidUpdate(preProps) {}

  componentWillUnmount() {}

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo} id="logo">
            <Link to="/">
              {/* <img src={logo} alt="logo" /> */}
              <h1>Sangoes Web</h1>
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="31">Tom</Menu.Item>
              <Menu.Item key="41">Bill</Menu.Item>
              <Menu.Item key="51">Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          {/* 头部 */}
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              currentUser={
                '' // onNoticeVisibleChange={this.handleNoticeVisibleChange} // onMenuClick={this.handleMenuClick} // onNoticeClear={this.handleNoticeClear} // onCollapse={handleMenuCollapse}
              }
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
