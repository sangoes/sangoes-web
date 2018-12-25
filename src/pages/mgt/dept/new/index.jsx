import React, { Component } from 'react';
import { Modal, Form, Input, TreeSelect } from 'antd';
import { getTreeNode } from '@/utils/reactUtils';
import { getTreeParentId } from '@/utils/utils';

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
      itemKeys: ['-1'],
      departItem: null,
    };
  }

  // 展示
  show = item => {
    this.setState({ modalVisible: true, departItem: null });
    item && this.setState({ itemKeys: item.id });
  };
  // 隐藏
  hide = () => {
    this.setState({ modalVisible: false, departItem: null });
  };
  // 更新item
  showUpdate = item => {
    const { departTree } = this.props;
    this.setState({ modalVisible: true, departItem: item });
    const key = getTreeParentId(departTree, item.id);
    item && this.setState({ itemKeys: key });
  };
  // 确认
  _onOkHandle = () => {
    const { form, onOkHandle, onUpdateHandle } = this.props;
    const { departItem } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // 调用
      departItem ? onUpdateHandle(fieldsValue) : onOkHandle(fieldsValue);
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
    const { modalVisible, itemKeys, departItem } = this.state;

    return (
      <Modal
        destroyOnClose
        title={departItem ? '更新部门' : '新建部门'}
        visible={modalVisible}
        onCancel={this.hide}
        onOk={this._onOkHandle}
      >
        {/* 隐藏id */}
        {departItem && (
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="主键"
            style={{ display: 'none' }}
          >
            {form.getFieldDecorator('id', {
              initialValue: departItem && departItem.id,
              rules: [{ required: true }],
            })(<Input placeholder="主键" disabled style={{ display: 'none' }} />)}
          </FormItem>
        )}
        {/* 所属部门 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属部门">
          {form.getFieldDecorator('parentId', {
            initialValue: itemKeys,
            rules: [{ required: true, message: '所属部门不能为空' }],
          })(this._renderDepartSelect())}
        </FormItem>
        {/* 部门名称 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="部门名称">
          {form.getFieldDecorator('departName', {
            initialValue: departItem && departItem.name,
            rules: [{ required: true, message: '部门名称至少2位最多12位', min: 2, max: 12 }],
          })(<Input placeholder="部门名称" />)}
        </FormItem>
        {/* 描述 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('des', {
            initialValue: departItem && departItem.des,
          })(<Input placeholder="描述" />)}
        </FormItem>
      </Modal>
    );
  }
}
