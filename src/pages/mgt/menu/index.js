import React, { Component } from 'react';
import styles from './index.less';
import { Layout, Menu, Breadcrumb, Icon, Button, Input, Divider } from 'antd';
import { PageHeader } from 'ant-design-pro';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

/**
 *菜单 权限 管理
 */
export default class MenuMgtPage extends Component {
  render() {
    return (
      <Layout>
        <PageHeader title="菜单管理" />
        <Content className={styles.content}>
          <Layout className={styles.layout}>
            <Sider className={styles.sider} width={220}>
              {/* 按钮 */}
              <div className={styles.div}>
                {/* 新建 */}
                <Button size="small" type="primary">
                  新建
                </Button>
                {/* 编辑 */}
                <Button className={styles.button} size="small">
                  编辑
                </Button>
                {/* 删除 */}
                <Button className={styles.button} size="small" type="danger" ghost>
                  删除
                </Button>
              </div>

              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      subnav 1
                    </span>
                  }
                >
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      subnav 2
                    </span>
                  }
                >
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                      subnav 3
                    </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 20px', minHeight: '100%' }}>Content</Content>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
