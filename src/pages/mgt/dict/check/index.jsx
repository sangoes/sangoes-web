import React, { Component } from 'react';
import { Modal } from 'antd';

/**
 * 查看字典
 */
export default class CheckDictPage extends Component {
  // 确定
  _onOkHandle = () => {};
  // 渲染
  render() {
    const { onCancel, visible } = this.props;
    return (
      <Modal
        width="70%"
        destroyOnClose
        title="绑定菜单权限"
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        查看字典
      </Modal>
    );
  }
}
