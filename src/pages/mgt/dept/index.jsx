import React, { Component } from 'react';
import { PageHeader } from 'ant-design-pro';
import styles from './index.less';
import BaseMenu from '@/components/BaseMenu';
import { Layout, Input, Dropdown, Icon, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

/**
 * 部门管理
 */
export default class DeptMgtPage extends Component {
  // 菜单
  _menus = (
    <Menu onClick={this.handleMenuClick} selectedKeys={['add']}>
      <Menu.Item key="add">添加部门</Menu.Item>
      <Menu.Item key="edit">编辑</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
  );
  // 下拉菜单
  _dropdown = (
    <Dropdown overlay={this._menus} trigger={['click']}>
      <a>
        <Icon type="plus" className={styles.icon} />
      </a>
    </Dropdown>
  );
  render() {
    return (
      <Layout>
        <PageHeader title="部门管理" />
        <Content className={styles.content}>
          <Layout className={styles.layout}>
            <Sider className={styles.sider} width={220}>
              <Input
                className={styles.input}
                addonAfter={this._dropdown}
                placeholder="搜索公司或部门"
              />
              {/* 菜单 */}
              {/* <BaseMenu
                theme="light"
                link={false}
                menuData={menuTree}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onSelect={this._onMenuSelect}
              /> */}
            </Sider>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
