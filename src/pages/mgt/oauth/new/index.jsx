import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Select, Radio, Icon } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
/**
 * 新建授权
 */
export default class NewOAuthPage extends Component {
  // 渲染授权模式
  _renderGrantTypesSelect = () => {
    // 授权模式 grant_type
    const types = [
      'password',
      'refresh_token',
      'authorization_code',
      'client_credentials',
      'implicit',
    ];
    const data = [];
    types.forEach(item => {
      data.push(
        <Option key={item} value={item}>
          {item}
        </Option>
      );
    });
    return (
      <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="选择授权模式(多项)"
        tokenSeparators={[',']}
        onChange={this._onGrantTypesHandle}
      >
        {data}
      </Select>
    );
  };
  // 授权模式确认
  _onGrantTypesHandle = val => {};
  // 确认
  _onOkHandle = () => {
    const { form, onOkHandle, onUpdateHandle } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // 调用
      onOkHandle(fieldsValue);
    });
  };
  // 选择授权过期时间
  _onTokenValidHandle = () => {};
  // 渲染授权过期时间
  _renderTokenValidSelect = () => {
    const tokenValid = [{ key: 'xx', value: '123' }];
    const data = [];
    tokenValid.forEach(item => {
      data.push(
        <Option key={item.key} value={item.value}>
          {item.value}
        </Option>
      );
    });
    return (
      <Select defaultValue="a1" style={{ width: '100%' }} onChange={this._onTokenValidHandle}>
        {data}
      </Select>
    );
  };
  render() {
    const { form, visible, onCancel } = this.props;
    return (
      <Modal
        destroyOnClose
        title={'新建授权'}
        visible={visible}
        onCancel={onCancel}
        onOk={() => {
          this._onOkHandle();
        }}
      >
        {/* 客户端id */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="客户端ID">
          {form.getFieldDecorator('clientId', {
            rules: [{ required: true, message: '输入客户端id至少2位最多32位', min: 2, max: 32 }],
          })(<Input placeholder="输入客户端id" />)}
        </FormItem>
        {/* 客户端密钥 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="客户端密钥">
          {form.getFieldDecorator('clientSecret', {
            rules: [{ required: true, message: '输入客户端密钥至少2位最多32位', min: 2, max: 32 }],
          })(<Input placeholder="输入客户端密钥" />)}
        </FormItem>
        {/* 授权域 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="授权域">
          {form.getFieldDecorator('scope', {
            rules: [{ required: true, message: '输入授权域至少2位最多20位', min: 2, max: 20 }],
          })(<Input placeholder="输入授权域" />)}
        </FormItem>
        {/* 授权模式 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="授权模式">
          {form.getFieldDecorator('authorizedGrantTypes', {
            rules: [{ required: true, message: '输入授权模式' }],
          })(this._renderGrantTypesSelect())}
        </FormItem>
        {/* 失效时间 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="失效时间">
          {form.getFieldDecorator('accessTokenValidity', {
            rules: [{ required: false }],
          })(<Input placeholder="失效时间(秒)(空为12小时)(0为永久)" />)}
        </FormItem>
        {/* 刷新时间 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="刷新时间">
          {form.getFieldDecorator('refreshTokenValidity', {
            rules: [{ required: false }],
          })(<Input placeholder="刷新时间(秒)(空为一周)(0为永久)" />)}
          {/* <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
            展开 <Icon type="down" />
          </a> */}
        </FormItem>

        {/* 权限 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="权限">
          {form.getFieldDecorator('authorities', {
            rules: [{ required: false }],
          })(<Input placeholder="权限" />)}
        </FormItem>
        {/* 回调地址 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="回调地址">
          {form.getFieldDecorator('webServerRedirectUri', {
            rules: [{ required: false }],
          })(<Input placeholder="回调地址(url)" />)}
        </FormItem>
        {/* 资源ID */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="资源ID">
          {form.getFieldDecorator('resourceIds', {
            rules: [{ required: false }],
          })(<Input placeholder="资源ID" />)}
        </FormItem>
        {/* 扩展信息 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="扩展信息">
          {form.getFieldDecorator('additionalInformation', {
            rules: [{ required: false }],
          })(<Input placeholder="扩展信息" />)}
        </FormItem>
        {/* 是否放行 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="是否放行">
          {form.getFieldDecorator('autoapprove', {
            initialValue: true,
            rules: [{ required: false }],
          })(
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          )}
        </FormItem>
      </Modal>
    );
  }
}
