import React, { Component } from 'react';
import { Modal, Row, Col, Tree } from 'antd';

const { TreeNode } = Tree;

/**
 * 绑定部门
 */
export default class BindDeptPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  // 展示
  show = () => {
    this.setState({ visible: true });
  };
  // 隐藏
  hide = () => {
    this.setState({ visible: false });
  };
  // 确定
  _onOkHandle = () => {};
  // 渲染
  render() {
    const { visible } = this.state;
    return (
      <Modal
        destroyOnClose
        title="绑定部门"
        visible={visible}
        onCancel={this.hide}
        onOk={this._onOkHandle}
      >
        <Row type="flex" justify="center">
          <Col>d</Col>
        </Row>
      </Modal>
    );
  }
}
