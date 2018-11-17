import React, { Component, Fragment } from 'react';
import styles from './index.less';
import { Layout, Menu, Breadcrumb, Icon, Button, Input, Divider, Form, Dropdown } from 'antd';
import { PageHeader } from 'ant-design-pro';
import { connect } from 'dva';
import { createActions, createAction } from '@/utils';
import BaseMenu from '@/components/BaseMenu';
import _ from 'lodash';
import { getFileItem } from 'antd/lib/upload/utils';
import NewMenuPage from './new/menu';
import NewAuthPage from './new/auth';
import moment from 'moment';
import StandardTable from '@/components/StandardTable';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

/**
 *菜单 权限 管理
 */
@connect(({ menu, auth, loading }) => ({
  ...menu,
  ...auth,
  authLoading: loading.models.auth,
}))
@Form.create()
export default class MenuMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      menuId: null,
    };
  }
  // 加载完成
  componentDidMount() {
    // 获取菜单
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
  // 新建权限点击确定
  _handleAddAuth = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('auth/addAuth')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewAuthPage.hide();
      })
    );
  };
  // 下拉项点击
  handleMenuClick = e => {
    const { dispatch, menuTree, selectedKeys } = this.props;
    switch (e.key) {
      case 'add':
        // 获取item
        const menuId = this.state.menuId || selectedKeys[0];
        const item = this.getItem(menuTree, menuId);
        this.NewMenuPage.show(item);
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
  // 选择
  _handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  // table变化
  _handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    // 网络获取
    // this._getRolePageNet(params);
  };
  // 更多下拉
  moreMenu = (
    <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
      <Menu.Item key="edit">修改</Menu.Item>
      <Menu.Item key="bindUser">绑定角色</Menu.Item>
      <Menu.Item key="reset">重置密码</Menu.Item>
    </Menu>
  );
  // table列表
  columns = [
    {
      title: '权限名',
      dataIndex: 'authName',
    },
    {
      title: '权限编码',
      dataIndex: 'authCode',
    },
    {
      title: '权限地址',
      dataIndex: 'action',
    },
    {
      title: '描述',
      dataIndex: 'des',
    },
    {
      title: '更新时间',
      dataIndex: 'updTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <Button size="small" type="danger" ghost onClick={() => {}}>
            删除
          </Button>
          <Divider type="vertical" />
          <Dropdown overlay={this.moreMenu} trigger={['click']}>
            <Button size="small" onClick={() => {}}>
              更多 <Icon type="down" />
            </Button>
          </Dropdown>
        </Fragment>
      ),
    },
  ];
  // 菜单选中
  _onMenuSelect = e => {
    this.setState({
      menuId: e.key,
    });
    this.props.dispatch(createAction('auth/getAuthPage')({ menuId: e.key }));
  };
  // 新建权限
  _onNewAuthClick = () => {
    const { selectedKeys } = this.props;
    const menuId = this.state.menuId || selectedKeys[0];
    this.NewAuthPage.show(menuId);
  };

  render() {
    const { menuTree, menuList, form, selectedKeys, openKeys, authList, authLoading } = this.props;
    const { selectedRows } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={['add']}>
        <Menu.Item key="add">添加菜单</Menu.Item>
        <Menu.Item key="edit">编辑</Menu.Item>
        <Menu.Item key="delete">删除</Menu.Item>
      </Menu>
    );
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
                onSelect={this._onMenuSelect}
              />
            </Sider>
            <Content style={{ padding: '0 20px', minHeight: '100%' }}>
              <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary" onClick={this._onNewAuthClick}>
                    新建
                  </Button>
                  {selectedRows.length > 0 && (
                    <span>
                      <Button type="danger" ghost>
                        批量删除
                      </Button>
                    </span>
                  )}
                </div>
                {/* 表格 */}
                <StandardTable
                  rowKey="id"
                  selectedRows={selectedRows}
                  loading={authLoading}
                  data={authList}
                  columns={this.columns}
                  onSelectRow={this._handleSelectRows}
                  onChange={this._handleStandardTableChange}
                />
              </div>
            </Content>
          </Layout>
        </Content>
        {/* 新建菜单 */}
        <NewMenuPage
          wrappedComponentRef={ref => (this.NewMenuPage = ref)}
          menus={menuList}
          onOkHandle={this._handleAdd}
        />
        {/* 新建权限 */}
        <NewAuthPage
          wrappedComponentRef={ref => (this.NewAuthPage = ref)}
          onOkHandle={this._handleAddAuth}
        />
      </Layout>
    );
  }
}
