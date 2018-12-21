import React, { Component, Fragment } from 'react';
import styles from './index.less';
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Button,
  Input,
  Divider,
  Form,
  Dropdown,
  Modal,
} from 'antd';
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
const confirm = Modal.confirm;

/**
 *菜单 权限 管理
 */
@connect(({ menu, auth, loading, routing }) => ({
  ...menu,
  ...auth,
  ...routing,
  authLoading: loading.models.auth,
}))
@Form.create()
export default class MenuMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      menuId: null,
      authItem: null,
      selectedKeys: [],
      openKeys: [],
    };
  }
  // 加载完成
  componentDidMount() {
    // 获取菜单
    this.props.dispatch(
      createActions('menu/getMenuTree')()(() => {
        const { selectedKeys, openKeys } = this.props;
        this.setState({
          selectedKeys,
          openKeys,
        });
      })
    );
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
  // 更新权限点击确定
  _handleUpdateAuth = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('auth/updateAuth')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewAuthPage.hide();
      })
    );
  };
  // 更新菜单点击确定
  _handleUpdateMenu = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('menu/updateMenu')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewMenuPage.hide();
      })
    );
  };
  // 下拉项点击
  handleMenuClick = e => {
    const { dispatch, menuTree, selectedKeys } = this.props;
    const menuId = this.state.menuId || selectedKeys[0];
    const item = this.getItem(menuTree, menuId);
    switch (e.key) {
      case 'add':
        this.NewMenuPage.show(item);
        break;
      case 'edit':
        this.NewMenuPage.showUpdate(item);
        break;
      case 'delete':
        // 对话框
        confirm({
          title: '确认删除菜单?',
          content: '一旦删除将不可恢复',
          onOk() {
            dispatch(createAction('menu/deleteMenu')({ menuId: menuId }));
          },
        });
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
    const { dispatch, selectedKeys } = this.props;
    const { formValues, menuId } = this.state;
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
    // 参数
    params.menuId = menuId || selectedKeys[0];
    // 获取权限分页
    this._getAuthPage(params);
  };
  // 下拉项点击
  handleAuthMenuClick = e => {
    const { dispatch, menuTree, selectedKeys } = this.props;
    switch (e.key) {
      // 修改
      case 'edit':
        const { authItem, menuId } = this.state;
        this.NewAuthPage.showUpdate(authItem, menuId || selectedKeys[0]);
        break;
      default:
        break;
    }
  };
  // 更多下拉
  moreMenu = (
    <Menu onClick={this.handleAuthMenuClick} selectedKeys={[]}>
      <Menu.Item key="edit">修改</Menu.Item>
    </Menu>
  );
  // 删除权限
  _deleteAuth = item => {
    const { dispatch, selectedKeys } = this.props;
    const { menuId } = this.state;
    confirm({
      title: '确定删除权限?',
      content: '一旦删除将不可恢复',
      onOk() {
        dispatch(
          createAction('auth/deleteAuth')({
            authId: item.id,
            menuId: menuId || selectedKeys[0],
          })
        );
      },
    });
  };
  // 批量删除权限
  _onBatchDeleteAuthClick = () => {
    const { selectedRows, menuId } = this.state;
    const { dispatch, selectedKeys } = this.props;
    const keys = selectedRows.map(item => {
      return item.id;
    });
    // 对话框
    confirm({
      title: '确定批量删除权限?',
      content: '一旦删除将不可恢复',
      onOk() {
        dispatch(
          createAction('auth/batchDeleteAuth')({
            authIds: keys,
            menuId: menuId || selectedKeys[0],
          })
        );
      },
    });
  };
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
      title: '请求方法',
      dataIndex: 'method',
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
          {/* 删除确认 */}
          <Button size="small" type="danger" ghost onClick={() => this._deleteAuth(record)}>
            删除
          </Button>
          <Divider type="vertical" />
          <Dropdown overlay={this.moreMenu} trigger={['click']}>
            <Button
              size="small"
              onClick={() => {
                this.setState({ authItem: record });
              }}
            >
              更多 <Icon type="down" />
            </Button>
          </Dropdown>
        </Fragment>
      ),
    },
  ];
  // 菜单选中
  _onMenuSelect = ({ item, key, selectedKeys }) => {
    this.setState({ menuId: key, selectedKeys });
    // 获取分页
    this._getAuthPage({ menuId: key });
  };
  // 新建权限
  _onNewAuthClick = () => {
    const { selectedKeys } = this.props;
    const menuId = this.state.menuId || selectedKeys[0];
    this.NewAuthPage.show(menuId);
  };
  // 获取权限分页
  _getAuthPage = params => {
    this.props.dispatch(createAction('auth/getAuthPage')(params));
  };

  render() {
    const { menuTree, menuList, form, authList, authLoading, location } = this.props;
    const { selectedRows, selectedKeys, openKeys } = this.state;
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
                theme="light"
                link={false}
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
                      <Button type="danger" ghost onClick={this._onBatchDeleteAuthClick}>
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
          onUpdateHandle={this._handleUpdateMenu}
        />
        {/* 新建权限 */}
        <NewAuthPage
          wrappedComponentRef={ref => (this.NewAuthPage = ref)}
          onOkHandle={this._handleAddAuth}
          onUpdateHandle={this._handleUpdateAuth}
        />
      </Layout>
    );
  }
}
