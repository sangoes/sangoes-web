import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row } from 'antd';
import styles from '../index.less';

const FormItem = Form.Item;
/**
 * 新建角色
 */
export default class NewRolePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      roleItem: null,
    };
  }

  // 显示
  show() {
    this.setState({ modalVisible: true, roleItem: null });
  }
  // 显示
  showUpdate(item) {
    this.setState({ modalVisible: true, roleItem: item });
  }
  // 隐藏
  hide() {
    this.setState({ modalVisible: false });
  }
  // 确认
  _onOkHandle() {
    const { form, onOkHandle, onUpdateHandle } = this.props;
    const { roleItem } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // 调用
      roleItem ? onUpdateHandle(fieldsValue) : onOkHandle(fieldsValue);
    });
  }
  render() {
    const { form, onOkHandle } = this.props;
    const { roleItem } = this.state;
    return (
      <Modal
        destroyOnClose
        title={roleItem ? '更新角色' : '新建角色'}
        visible={this.state.modalVisible}
        onCancel={() => this.hide()}
        onOk={() => {
          this._onOkHandle();
        }}
      >
        {/* 隐藏id */}
        {roleItem && (
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="主键"
            style={{ display: 'none' }}
          >
            {form.getFieldDecorator('id', {
              initialValue: roleItem && roleItem.id,
              rules: [{ required: true }],
            })(<Input placeholder="主键" disabled style={{ display: 'none' }} />)}
          </FormItem>
        )}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色名">
          {form.getFieldDecorator('roleName', {
            initialValue: roleItem && roleItem.roleName,
            rules: [{ required: true, message: '输入2-10位的角色名', min: 2, max: 10 }],
          })(<Input placeholder="输入2-10位的角色名" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="角色编码">
          {form.getFieldDecorator('roleCode', {
            initialValue: roleItem && roleItem.roleCode,
            rules: [{ required: true, message: '输入2-18位角色编码', min: 2, max: 18 }],
          })(<Input placeholder="输入2-18位角色编码" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('des', {
            initialValue: roleItem && roleItem.des,
            rules: [{ required: false, message: '描述最多50个字符', max: 50 }],
          })(<Input placeholder="描述" />)}
        </FormItem>
      </Modal>
    );
  }
}
