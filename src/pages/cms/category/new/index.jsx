import React, { Component } from 'react';
import { Modal, Form } from 'antd';

const FormItem = Form.Item;
/**
 * 添加分类
 */
@Form.create()
export default class NewCategoryPage extends Component {
  // 确定
  _onOkHandle = () => {};
  render() {
    const { visible, onCancel, form } = this.props;
    return (
      <Modal
        destroyOnClose
        title={'新建文章'}
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        添加分类
      </Modal>
    );
  }
}
