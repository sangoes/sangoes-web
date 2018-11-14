import React, { Component } from 'react';
import { Modal, Row, Tree, Button, Col, Card, Input, Table } from 'antd';
import styles from '../index.less';
import { connect } from 'dva';
import moment from 'moment';
import StandardTable from '@/components/StandardTable';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;
/**
 * 绑定菜单权限
 */
@connect(({ role, loading }) => ({
  ...role,
  roleLoading: loading.models.role,
}))
export default class BindMenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, selectedRows: [], checkedKeys: [], selectedKeys: [] };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      checkedKeys: nextProps.menuKeys,
      selectedRows: nextProps.authKeys,
      selectedKeys: nextProps.selectedKeys,
    });
  }
  // 显示
  show() {
    this.setState({ modalVisible: true });
  }
  // 隐藏
  hide() {
    this.setState({ modalVisible: false });
  }
  // 确定
  _onOkHandle = () => {
    const { handleAdd } = this.props;
    handleAdd(this.state.targetKeys);
  };
  // 获取数节点
  _getTreeNode(menus) {
    return menus.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode key={item.id} title={item.name}>
            {this._getTreeNode(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.name} />;
    });
  }
  // 复选
  _onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };
  // 选中
  _onSelect = (selectedKeys, info) => {
    this.setState({
      selectedKeys: selectedKeys,
    });
    this.props.onMenuSelect(selectedKeys[0]);
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
      title: '描述',
      dataIndex: 'des',
    },
    {
      title: '更新时间',
      dataIndex: 'updTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];
  // 选择
  _handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  render() {
    const {
      menus,
      menuKeys,
      expandedKeys,
      visible,
      auths,
      authKeys,
      authLoading,
      onCancel,
    } = this.props;
    const { selectedRows, selectedKeys, checkedKeys } = this.state;
    return (
      <Modal
        width="70%"
        destroyOnClose
        title="绑定菜单权限"
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        <Row>
          {/* 权限 */}
          <Col span={18} push={6}>
            <Card className={styles.menu}>
              <div className={styles.tableList}>
                {/* 表格 */}
                <StandardTable
                  rowKey="id"
                  selectedRows={selectedRows}
                  loading={authLoading}
                  data={{ list: auths }}
                  columns={this.columns}
                  onSelectRow={this._handleSelectRows}
                  onChange={this._handleStandardTableChange}
                />
              </div>
            </Card>
          </Col>
          {/* 菜单 */}
          <Col span={6} pull={18}>
            <Card className={styles.menu}>
              {selectedKeys.length > 0 && (
                <Tree
                  checkable
                  defaultExpandedKeys={expandedKeys}
                  defaultCheckedKeys={checkedKeys}
                  defaultSelectedKeys={selectedKeys}
                  onSelect={this._onSelect}
                  onCheck={this._onCheck}
                >
                  {this._getTreeNode(menus)}
                </Tree>
              )}
            </Card>
          </Col>
        </Row>
      </Modal>
    );
  }
}
