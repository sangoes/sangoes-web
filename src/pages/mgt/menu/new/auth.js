import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Select } from 'antd';
import { createAction } from '@/utils';
const FormItem = Form.Item;
const Option = Select.Option;

/**
 * 新建权限
 */
@Form.create()
export default class NewAuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, menuId: '-1', authItem: null };
  }

  // 显示
  show(id) {
    // 清空form
    this.setState({ modalVisible: true, authItem: null, menuId: id });
  }
  // 显示
  showUpdate(item, id) {
    // 清空form
    this.setState({ modalVisible: true, authItem: item, menuId: id });
  }
  // 隐藏
  hide() {
    this.setState({ modalVisible: false });
  }
  // 确认
  _onOkHandle() {
    const { form, onOkHandle, onUpdateHandle } = this.props;
    const { authItem } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // 调用
      authItem ? onUpdateHandle(fieldsValue) : onOkHandle(fieldsValue);
    });
  }

  render() {
    const { form, onOkHandle } = this.props;
    const { menuId, authItem } = this.state;
    return (
      <Modal
        destroyOnClose
        title={authItem ? '更新权限' : '新建权限'}
        visible={this.state.modalVisible}
        onCancel={() => this.hide()}
        onOk={() => {
          this._onOkHandle();
        }}
      >
        {/* 隐藏id */}
        {authItem && (
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="主键"
            style={{ display: 'none' }}
          >
            {form.getFieldDecorator('id', {
              initialValue: authItem && authItem.id,
              rules: [{ required: true }],
            })(<Input placeholder="主键" disabled style={{ display: 'none' }} />)}
          </FormItem>
        )}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单主键">
          {form.getFieldDecorator('menuId', {
            initialValue: menuId,
            rules: [{ required: true }],
          })(<Input placeholder="菜单主键" disabled />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限名称">
          {form.getFieldDecorator('authName', {
            initialValue: authItem && authItem.authName,
            rules: [{ required: true, message: '输入权限名称2-16位', min: 2, max: 16 }],
          })(<Input placeholder="输入权限名称2-16位" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限编码">
          {form.getFieldDecorator('authCode', {
            initialValue: authItem && authItem.authCode,
            rules: [{ required: true, message: '输入权限编码2-30位', min: 2, max: 30 }],
          })(<Input placeholder="例如:admin:user:add" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="请求方法">
          {form.getFieldDecorator('method', {
            initialValue: (authItem && authItem.method) || 'get',
            rules: [{ required: true, message: '请求方法' }],
          })(
            <Select style={{ width: '100%' }}>
              <Option value="get">GET(获取)</Option>
              <Option value="post">POST(提交)</Option>
              <Option value="put">PUT(更新)</Option>
              <Option value="delete">DELETE(删除)</Option>
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限地址">
          {form.getFieldDecorator('action', {
            initialValue: authItem && authItem.action,
            rules: [{ required: true, message: '权限地址,例如:/api/user/add' }],
          })(<Input placeholder="权限地址,例如:/api/user/add" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('des', {
            initialValue: authItem && authItem.des,
            rules: [{ required: false, message: '描述最多50个字符', max: 50 }],
          })(<Input placeholder="描述" />)}
        </FormItem>
      </Modal>
    );
  }
}
