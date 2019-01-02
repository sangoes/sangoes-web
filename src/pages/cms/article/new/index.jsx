import React, { Component } from 'react';
import { Modal } from 'antd';

/**
 * 新建文章
 */
export default class NewArticlePage extends Component {
  // 确定
  _onOkHandle = () => {};
  // 渲染
  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal
        destroyOnClose
        width="70%"
        title={'新建文章'}
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        新建文章
      </Modal>
    );
  }
}
