import React, { Component } from 'react';
import { Modal, Row, Col, Tree } from 'antd';
import { connect } from 'dva';
import { createAction, createActions } from '@/utils';
import { getTreeNode } from '@/utils/reactUtils';

const { TreeNode } = Tree;
const DirectoryTree = Tree.DirectoryTree;

/**
 * 绑定部门
 */
@connect(({ user }) => ({
  ...user,
}))
export default class BindDeptPage extends Component {
  constructor(props) {
    super(props);
    this.state = { checkedKeys: [] };
  }

  // 加载完成
  componentDidMount = () => {
    const { record, dispatch } = this.props;
    dispatch(
      createActions('user/treeBindDepart')(record.id)(() => {
        const { departKeys } = this.props;
        this.setState({ checkedKeys: departKeys });
      })
    );
  };

  // 确定
  _onOkHandle = () => {
    const { handleAdd } = this.props;
    const { checkedKeys } = this.state;
    handleAdd(checkedKeys);
  };
  // 部门选择
  _onDepartSelect = (checkedKeys, e) => {
    // console.log(checkedKeys);

    this.setState({ checkedKeys });
  };
  // 渲染
  render() {
    const { checkedKeys } = this.state;
    const { visible, onCancel, departTrees } = this.props;

    return (
      <Modal
        destroyOnClose
        title="绑定部门"
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        <Row type="flex" justify="center">
          <Col>
            <DirectoryTree
              checkable
              defaultExpandAll
              checkedKeys={checkedKeys}
              onCheck={this._onDepartSelect}
            >
              {getTreeNode(departTrees)}
            </DirectoryTree>
          </Col>
        </Row>
      </Modal>
    );
  }
}
