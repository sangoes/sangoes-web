import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row, Select } from 'antd';
import { createAction } from '@/utils';

const Option = Select.Option;
const FormItem = Form.Item;
/**
 * 新建菜单
 */
@Form.create()
export default class NewMenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false, item: { key: '-1', label: '顶级菜单' }, menuItem: null };
  }

  componentDidMount() {}

  // 显示
  show(item) {
    const parentItem = this._getParentItem(item);
    // 清空form
    this.setState({
      modalVisible: true,
      item: { key: parentItem.id, label: parentItem.menuName },
      menuItem: null,
    });
  }
  // 显示
  showUpdate(item) {
    const parentItem = this._getParentItem(item);
    // 清空form
    this.setState({
      modalVisible: true,
      item: { key: parentItem.id, label: parentItem.menuName },
      menuItem: item,
    });
  }
  // 隐藏
  hide() {
    this.setState({ modalVisible: false });
  }
  // 获取parentItem
  _getParentItem(item) {
    const { menus } = this.props;
    const parentItem = menus.find(itemVal => {
      return itemVal.id === item.parentId;
    });
    return parentItem;
  }
  // 确认
  _onOkHandle() {
    const { form, onOkHandle, onUpdateHandle } = this.props;
    const { menuItem } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // 设置parent id
      fieldsValue.parentId = fieldsValue.parentId.key;
      // 调用
      menuItem ? onUpdateHandle(fieldsValue) : onOkHandle(fieldsValue);
    });
  }
  // 渲染父菜单
  _renderSelect() {
    const { menus } = this.props;
    const data = [];
    data.push(
      <Option key="-1" value="-1">
        顶级菜单
      </Option>
    );
    menus.forEach(item => {
      data.push(
        <Option key={item.id} value={item.id}>
          {item.menuName}
        </Option>
      );
    });
    return (
      <Select
        showSearch
        style={{ width: '100%' }}
        placeholder="搜索父级菜单"
        optionFilterProp="children"
        labelInValue
      >
        {data}
      </Select>
    );
  }
  render() {
    const { form, onOkHandle } = this.props;
    const { item, menuItem } = this.state;
    return (
      <Modal
        destroyOnClose
        title={menuItem ? '更新菜单' : '新建菜单'}
        visible={this.state.modalVisible}
        onCancel={() => this.hide()}
        onOk={() => {
          this._onOkHandle();
        }}
      >
        {/* 隐藏id */}
        {menuItem && (
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="主键"
            style={{ display: 'none' }}
          >
            {form.getFieldDecorator('id', {
              initialValue: menuItem && menuItem.id,
              rules: [{ required: true }],
            })(<Input placeholder="主键" disabled style={{ display: 'none' }} />)}
          </FormItem>
        )}
        {/* 父节菜单 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父节菜单">
          {form.getFieldDecorator('parentId', {
            initialValue: item,
            rules: [{ required: true }],
          })(this._renderSelect())}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单名">
          {form.getFieldDecorator('menuName', {
            initialValue: menuItem && menuItem.name,
            rules: [
              {
                required: true,
                message: '输入菜单名称2-20位',
                min: 2,
                max: 20,
              },
            ],
          })(<Input placeholder="输入菜单名称2-20位" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单编码">
          {form.getFieldDecorator('menuCode', {
            initialValue: menuItem && menuItem.menuCode,
            rules: [
              {
                required: true,
                message: '输入菜单编码2-15位',
                min: 2,
                max: 15,
              },
            ],
          })(<Input placeholder="输入菜单编码2-15位" />)}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图标">
          {form.getFieldDecorator('icon', {
            initialValue: menuItem && menuItem.icon,
            rules: [{ required: false, message: '图标名称' }],
          })(<Input placeholder="图标名称" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('des', {
            initialValue: menuItem && menuItem.des,
            rules: [
              {
                required: false,
                message: '描述最多50个字符',
                max: 50,
              },
            ],
          })(<Input placeholder="描述" />)}
        </FormItem>
      </Modal>
    );
  }
}
