import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { MSG_TYPE } from '@/constants/dict';
import { connect } from 'dva';
import { createAction } from '@/utils';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
/**
 * @description 新建消息
 * @author jerrychir
 * @export
 * @class NewMsgPage
 * @extends {Component}
 */
@connect(({ app, role, loading }) => ({
  ...app,
  ...role,
  dictLoading: loading.effects['app/listDict'],
  roleLoading: loading.effects['role/getAllRoles'],
}))
@Form.create()
export default class NewMsgPage extends Component {
  componentDidMount = () => {
    // 获取日志筛选选项
    this.props.dispatch(createAction('app/listDict')(MSG_TYPE));
    // 获取所有角色
    this.props.dispatch(createAction('role/getAllRoles')());
  };
  _onChangeMsgType = value => {
    console.log(value);
  };
  /**
   * @description 渲染消息类型
   * @memberof NewMsgPage
   */
  _renderMsgType = () => {
    const { listDict, dictLoading } = this.props;
    const dictData = listDict.map(item => (
      <Option key={item.key} value={item.key}>
        {item.value}
      </Option>
    ));
    return (
      <Select
        style={{ width: '100%' }}
        loading={dictLoading}
        onChange={this._onChangeMsgType}
        // labelInValue
      >
        {dictData}
      </Select>
    );
  };
  /**
   * @description 渲染所有角色
   * @memberof _renderRoles
   */
  _renderRoles = () => {
    const { roles, roleLoading } = this.props;
    const rolesData = roles.map(item => (
      <Option key={item.roleCode} value={item.roleCode}>
        {item.roleName}
      </Option>
    ));
    return (
      <Select
        style={{ width: '100%' }}
        loading={roleLoading}
        onChange={this._onChangeMsgType}
        showSearch
        mode="multiple"
        // labelInValue
      >
        {rolesData}
      </Select>
    );
  };
  /**
   * @description 渲染接收者
   * @memberof _renderReceiver
   */
  _renderReceiver = () => {
    const { roles, roleLoading } = this.props;
    const rolesData = roles.map(item => (
      <Option key={item.roleCode} value={item.roleCode}>
        {item.roleName}
      </Option>
    ));
    return (
      <Select
        style={{ width: '100%' }}
        loading={roleLoading}
        onChange={this._onChangeMsgType}
        showSearch
        mode="tags"
        // labelInValue
      >
        {rolesData}
      </Select>
    );
  };
  /**
   * @description 确定按钮
   * @memberof NewMsgPage
   */
  _onOkHandle = () => {
    const { form, onOkHandle } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onOkHandle(fieldsValue);
    });
  };
  render() {
    const { visible, onCancel, form, listDict } = this.props;
    return (
      <Modal
        destroyOnClose
        // width="70%"
        title={'新建消息'}
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        {/* 消息类型 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="消息类型">
          {form.getFieldDecorator('msgType', {
            initialValue: '1',
            rules: [{ required: true }],
          })(this._renderMsgType())}
        </FormItem>
        {/* 接收者角色 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="接收者角色">
          {form.getFieldDecorator('roleCode', {
            // initialValue: 'admin',
            rules: [{ required: true }],
          })(this._renderRoles())}
        </FormItem>
        {/* 接收者 */}
        {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="接收者">
          {form.getFieldDecorator('receiverId', {
            initialValue: '',
            rules: [{}],
          })(this._renderReceiver())}
        </FormItem> */}
        {/* 标题 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
          {form.getFieldDecorator('title', {
            initialValue: '',
            rules: [{ required: true, message: '标题不超过10个字', max: 10 }],
          })(<Input placeholder="输入标题" />)}
        </FormItem>
        {/* 副标题 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="副标题">
          {form.getFieldDecorator('subTitle', {
            initialValue: '',
            rules: [{ message: '副标题不超过15个字', max: 15 }],
          })(<Input placeholder="输入副标题" />)}
        </FormItem>
        {/* 内容 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="内容">
          {form.getFieldDecorator('content', {
            initialValue: '',
            rules: [{ required: true, message: '标题不超过50个字', max: 50 }],
          })(<TextArea placeholder="输入内容" />)}
        </FormItem>
      </Modal>
    );
  }
}
