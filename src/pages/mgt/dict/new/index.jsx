import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const FormItem = Form.Item;
/**
 * 新建字典
 */
@Form.create()
export default class NewDictPage extends Component {
  // 确定
  _onOkHandle = () => {
    const { form, onOkHandle } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // 调用
      onOkHandle(fieldsValue);
    });
  };
  // 排序改变
  _onSortChange = () => {};
  render() {
    const { visible, onCancel, form } = this.props;
    return (
      <Modal
        destroyOnClose
        title={'新建字典'}
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        {/* 字典名称 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典名称">
          {form.getFieldDecorator('dictValue', {
            // initialValue: userItem && userItem.realName,
            rules: [{ required: true, message: '输入字典名称最少2最多15', min: 2, max: 15 }],
          })(<Input placeholder="字典名称" />)}
        </FormItem>
        {/* 字典类型 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典类型">
          {form.getFieldDecorator('dictKey', {
            // initialValue: userItem && userItem.realName,
            rules: [
              {
                required: true,
                pattern: '^[a-zA-Z0-9_]+$',
                message: '输入字典名称必须英文最少2最多15',
                min: 2,
                max: 15,
              },
            ],
          })(<Input placeholder="字典类型(英文)(例如:sys_log_key)" />)}
        </FormItem>
        {/* 排序 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序">
          {form.getFieldDecorator('sort', {
            initialValue: 111,
          })(<InputNumber min={0} max={99999} onChange={this._onSortChange} />)}
        </FormItem>
        {/* 描述 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('des', {
            // initialValue: roleItem && roleItem.des,
            rules: [{ required: false, message: '描述最多50个字符', max: 50 }],
          })(<Input placeholder="描述" />)}
        </FormItem>
      </Modal>
    );
  }
}
