import React, { Component } from 'react';
import { Modal } from 'antd';
/**
 * 新建用户
 */
export default class NewUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  // 显示
  show() {
    this.setState({ modalVisible: true });
  }
  // 隐藏
  hide() {
    this.setState({ modalVisible: false });
  }
  render() {
    return (
      <Modal
        destroyOnClose
        title="新建用户"
        visible={this.state.modalVisible}
        // onOk={okHandle}
        onCancel={() => this.hide()}
      >
        ccc
      </Modal>
    );
  }
}
