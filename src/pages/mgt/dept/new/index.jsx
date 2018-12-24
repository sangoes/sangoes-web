import React, { Component } from 'react';
import { Modal, Form, Input, TreeSelect } from 'antd';
import { getTreeNode } from '@/utils/reactUtils';

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
/**
 * 新建部门
 */
@Form.create()
export default class NewDeptPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      departItem: ['-1'],
    };
  }

  // 展示
  show = item => {
    this.setState({ modalVisible: true });
    item &&
      this.setState({
        departItem: [item.id],
      });
  };
  // 隐藏
  hide = () => {
    this.setState({ modalVisible: false });
  };
  // 确认
  _onOkHandle = () => {
    const { form, onOkHandle, onUpdateHandle } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // 调用
      onOkHandle(fieldsValue);
    });
  };
  // 选择部门
  _onDeptChange = (value, label, extra) => {};
  // 渲染所属部门
  _renderDepartSelect() {
    const { departTree } = this.props;
    return (
      <TreeSelect
        style={{ width: 300 }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        onChange={this._onDeptChange}
      >
        {getTreeNode(departTree) || <TreeNode title="父级部门" key="-1" value="-1" />}
      </TreeSelect>
    );
  }
  render() {
    const { form, departTree } = this.props;
    const { modalVisible, departItem } = this.state;

    return (
      <Modal
        destroyOnClose
        title={'新建部门'}
        visible={modalVisible}
        onCancel={this.hide}
        onOk={this._onOkHandle}
      >
        {/* 所属部门 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属部门">
          {form.getFieldDecorator('parentId', {
            initialValue: departItem,
            rules: [{ required: true, message: '所属部门不能为空' }],
          })(this._renderDepartSelect())}
        </FormItem>
        {/* 部门名称 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="部门名称">
          {form.getFieldDecorator('departName', {
            // initialValue: oauthItem && oauthItem.clientId,
            rules: [{ required: true, message: '部门名称至少2位最多12位', min: 2, max: 12 }],
          })(<Input placeholder="部门名称" />)}
        </FormItem>
        {/* 描述 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('des', {
            // initialValue: oauthItem && oauthItem.clientId,
          })(<Input placeholder="描述" />)}
        </FormItem>
      </Modal>
    );
  }
}
