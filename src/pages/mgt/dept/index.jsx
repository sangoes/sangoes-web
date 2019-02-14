import React, { Component, Fragment } from 'react';
import { PageHeader } from 'ant-design-pro';
import styles from './index.less';
import BaseMenu from '@/components/BaseMenu';
import {
  Layout,
  Input,
  Dropdown,
  Icon,
  Menu,
  Form,
  Skeleton,
  Modal,
  Tree,
  Button,
  Divider,
  Spin,
} from 'antd';
import NewDeptPage from './new';
import { connect } from 'dva';
import { createActions, createAction } from '@/utils';
import { getTreeItem } from '@/utils/utils';
import { getDirectoryTreeNode } from '@/utils/reactUtils';
import StandardTable from '@/components/StandardTable';
import moment from 'moment';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const confirm = Modal.confirm;
const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

/**
 * 部门管理
 */
@connect(({ dept, loading }) => ({
  ...dept,
  deptTreeLoading: loading.effects['dept/getDepartTree'],
  bindUserLoading: loading.effects['dept/listDepartMembers'],
}))
@Form.create()
export default class DeptMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: props.selectedKeys,
      openKeys: props.openKeys,
      departId: null,
      selectedRows: [],
    };
  }

  // 渲染完成
  componentDidMount = () => {
    // 获取部门树形
    this._getDepartTree();
  };

  // 获取部门树形
  _getDepartTree = params => {
    const { dispatch } = this.props;
    dispatch(
      createActions('dept/getDepartTree')(params)(() => {
        const { selectedKeys, openKeys } = this.props;
        this.setState({
          selectedKeys,
          openKeys,
        });
      })
    );
  };

  // 处理部门按钮
  _handleDepartMenuClick = e => {
    const { dispatch, departTree } = this.props;
    const { departId, selectedKeys } = this.state;
    const item = getTreeItem(departTree, departId || selectedKeys[0]);
    switch (e.key) {
      // 添加部门
      case 'add':
        this.NewDeptPage.show(item);
        break;
      // 编辑部门
      case 'edit':
        this.NewDeptPage.showUpdate(item);
        break;
      // 删除部门
      case 'delete':
        // 对话框
        confirm({
          title: '确认删除部门?',
          content: '一旦删除将不可恢复',
          onOk() {
            dispatch(
              createAction('dept/deleteDepart')({
                departId: departId || selectedKeys[0],
              })
            );
          },
        });
        break;
      default:
        break;
    }
  };
  // 菜单
  _menus = (
    <Menu onClick={this._handleDepartMenuClick} selectedKeys={['add']}>
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
  // 新建部门点击确定
  _handleAdd = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('dept/addDepart')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewDeptPage.hide();
      })
    );
  };
  // 更新部门点击确定
  _handleUpdateDepart = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('dept/updateDepart')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewDeptPage.hide();
      })
    );
  };
  // 部门选中
  _onDepartSelect = (selectedKeys, e) => {
    const { dispatch } = this.props;
    this.setState({
      departId: selectedKeys[0],
      selectedKeys,
    });
    // 获取部门成员列表
    dispatch(createAction('dept/listDepartMembers')({ departId: selectedKeys.join() }));
  };
  // table列表
  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机',
      dataIndex: 'mobile',
    },
    {
      title: '创建时间',
      dataIndex: 'crtTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'updTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    // {
    //   title: '操作',
    //   render: (text, record) => (
    //     <Fragment>
    //       <Button
    //         size="small"
    //         type="danger"
    //         ghost
    //         onClick={() => {
    //           this._deleteUser(record);
    //         }}
    //       >
    //         删除
    //       </Button>
    //     </Fragment>
    //   ),
    // },
  ];
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
    // this._getUserPageNet(params);
  };
  render() {
    const { departTree, deptTreeLoading, members, bindUserLoading } = this.props;
    const { openKeys, selectedKeys, selectedRows } = this.state;
    return (
      <Layout>
        <PageHeader title="部门管理" />
        <Content className={styles.content}>
          <Layout className={styles.layout}>
            {/* 侧边栏 */}
            <Sider className={styles.sider} width={220}>
              <Skeleton loading={deptTreeLoading} active>
                <Input
                  className={styles.input}
                  addonAfter={this._dropdown}
                  placeholder="搜索公司或部门"
                />
                {/* 部门 */}
                <div className={styles.tree}>
                  <DirectoryTree
                    defaultSelectedKeys={selectedKeys}
                    defaultExpandAll
                    onSelect={this._onDepartSelect}
                  >
                    {getDirectoryTreeNode(departTree)}
                  </DirectoryTree>
                </div>
              </Skeleton>
            </Sider>
            <Content style={{ padding: '0 20px', minHeight: '100%' }}>
              <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary" onClick={this._onNewAuthClick}>
                    添加成员
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
                <Skeleton loading={bindUserLoading} active>
                  <StandardTable
                    rowKey="id"
                    selectedRows={selectedRows}
                    loading={bindUserLoading}
                    data={members}
                    columns={this.columns}
                    onSelectRow={this._handleSelectRows}
                    onChange={this._handleStandardTableChange}
                  />
                </Skeleton>
              </div>
            </Content>
          </Layout>
        </Content>
        {/* 新建部门 */}
        <NewDeptPage
          wrappedComponentRef={ref => (this.NewDeptPage = ref)}
          onOkHandle={this._handleAdd}
          departTree={departTree}
          onUpdateHandle={this._handleUpdateDepart}
        />
      </Layout>
    );
  }
}
