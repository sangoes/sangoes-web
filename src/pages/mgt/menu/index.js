/*
 * @Author: jerrychir @sangoes
 * @Date: 2018-11-09 15:53:45
 * @Last Modified by: jerrychir @sangoes
 * @Last Modified time: 2018-11-10 15:20:50
 */
import React, { Component } from 'react';
import styles from './index.less';
import { Layout, Menu, Breadcrumb, Icon, Button, Input, Divider, Form, Dropdown } from 'antd';
import { PageHeader } from 'ant-design-pro';
import NewMenuPage from './newMenu';
import { connect } from 'dva';
import { createActions, createAction } from '@/utils';
import BaseMenu from '@/components/BaseMenu';
import _ from 'lodash';
import { getFileItem } from 'antd/lib/upload/utils';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

/**
 *菜单 权限 管理
 */
@connect(({ menu }) => ({
  ...menu,
}))
@Form.create()
export default class MenuMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.menuId = -1;
  }
  // 加载完成
  componentDidMount() {
    this.props.dispatch(createAction('menu/getMenuTree')());
  }
  // 新建角色点击确定
  _handleAdd = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('menu/addMenu')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewMenuPage.hide();
      })
    );
  };
  // 下拉项点击
  handleMenuClick = e => {
    const { dispatch, menuTree } = this.props;
    switch (e.key) {
      case 'add':
        // 获取item
        const item = this.getItem(menuTree, this.menuId);
        this.NewMenuPage.show(item);
        break;
        break;
      case 'edit':
        break;
      case 'delete':
        break;
      default:
        break;
    }
  };
  // 获取父节点
  getItem(menuData, id) {
    const arr = [];
    function getSubItem(data, ids) {
      data.forEach(item => {
        if (item.id == ids) {
          arr.push(item);
        }
        if (item.children && item.children.length > 0) {
          getSubItem(item.children, ids);
        }
      });
    }
    getSubItem(menuData, id);
    return arr.length > 0 ? arr[0] : null;
  }
  // 获取keys
  getKeys(menuTree) {
    if (!(menuTree && menuTree.length > 0)) {
      return { openKeys: [], selectedKeys: [] };
    }
    const menuItem = menuTree[0];
    const openKeys = [];
    let selectedKeys;
    function getKeysItem(item) {
      selectedKeys = item.id;
      if (item.children && item.children.length > 0) {
        openKeys.push(item.id);
        // openKeys = item.id;
        getKeysItem(item.children[0]);
      }
    }
    getKeysItem(menuItem);
    return { openKeys: openKeys, selectedKeys: [selectedKeys] };
  }

  render() {
    const { menuTree, menuList } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={['add']}>
        <Menu.Item key="add">添加菜单</Menu.Item>
        <Menu.Item key="edit">编辑</Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    );
    // 获取keys
    const { openKeys, selectedKeys } = this.getKeys(menuTree);
    this.menuId = selectedKeys;
    return (
      <Layout>
        <PageHeader title="菜单管理" />
        <Content className={styles.content}>
          <Layout className={styles.layout}>
            <Sider className={styles.sider} width={220}>
              <Input
                className={styles.input}
                addonAfter={
                  <Dropdown overlay={menu} trigger={['click']}>
                    <a>
                      <Icon type="plus" className={styles.icon} />
                    </a>
                  </Dropdown>
                }
                placeholder="搜索菜单"
              />
              {/* 菜单 */}
              <BaseMenu
                menuData={menuTree}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onSelect={e => {
                  this.menuId = e.key;
                }}
              />
            </Sider>
            <Content style={{ padding: '0 20px', minHeight: '100%' }}>Content</Content>
          </Layout>
        </Content>
        {/* 新建菜单 */}
        <NewMenuPage
          ref={ref => (this.NewMenuPage = ref)}
          form={this.props.form}
          menus={menuList}
          onOkHandle={this._handleAdd}
        />
      </Layout>
    );
  }
}
