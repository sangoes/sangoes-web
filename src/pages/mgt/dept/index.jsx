import React, { Component } from 'react';
import { PageHeader } from 'ant-design-pro';
import styles from './index.less';
import BaseMenu from '@/components/BaseMenu';
import { Layout, Input, Dropdown, Icon, Menu, Form, Skeleton, Modal, Tree, Button } from 'antd';
import NewDeptPage from './new';
import { connect } from 'dva';
import { createActions, createAction } from '@/utils';
import { getTreeItem } from '@/utils/utils';
import { getDirectoryTreeNode } from '@/utils/reactUtils';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const confirm = Modal.confirm;
const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

/**
 * 部门管理
 */
@connect(({ dept, loading }) => ({ ...dept, deptTreeLoading: loading.models.dept }))
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
    this.setState({ departId: selectedKeys[0], selectedKeys });
    // 获取分页
    // this._getAuthPage({ menuId: key });
  };
  render() {
    const { departTree, deptTreeLoading } = this.props;
    const { openKeys, selectedKeys, selectedRows } = this.state;
    return (
      <Layout>
        <PageHeader title="部门管理" />
        <Content className={styles.content}>
          <Layout className={styles.layout}>
            <Skeleton loading={deptTreeLoading} active>
              {/* 侧边栏 */}
              <Sider className={styles.sider} width={220}>
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
                  {/* <StandardTable
                    rowKey="id"
                    selectedRows={selectedRows}
                    loading={authLoading}
                    data={authList}
                    columns={this.columns}
                    onSelectRow={this._handleSelectRows}
                    onChange={this._handleStandardTableChange}
                  /> */}
                </div>
              </Content>
            </Skeleton>
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
