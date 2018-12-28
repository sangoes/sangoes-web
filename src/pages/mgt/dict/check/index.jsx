import React, { Component } from 'react';
import styles from './index.less';
import {
  Modal,
  Tree,
  Input,
  Dropdown,
  Icon,
  Menu,
  Row,
  Col,
  Form,
  InputNumber,
  Spin,
  Skeleton,
  TreeSelect,
  Button,
} from 'antd';
import { connect } from 'dva';
import { createAction, createActions } from '@/utils';
import { getDirectoryTreeNode, getTreeNode } from '@/utils/reactUtils';
import { getTreeItem } from '@/utils/utils';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
/**
 * 查看字典
 */
@connect(({ dict, loading }) => ({ ...dict, dictTreeLoading: loading.effects['dict/dictTree'] }))
@Form.create()
export default class CheckDictPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: [],
      dictItem: null,
      editable: true,
    };
  }

  // 加载完成
  componentDidMount = () => {
    const { dispatch, dictItem } = this.props;
    dispatch(
      createActions('dict/dictTree')(dictItem.id)(() => {
        const { dictTree } = this.props;
        this.setState({
          selectedKeys: dictTree.length > 0 ? [dictTree[0].id] : '',
          dictItem: dictTree[0],
        });
      })
    );
  };
  // 确定
  _onOkHandle = () => {};
  // 处理字典按钮
  _handleDictMenuClick = e => {
    const { dispatch, dictTree } = this.props;
    const { selectedKeys } = this.state;
    // const item = getTreeItem(departTree, departId || selectedKeys[0]);
    switch (e.key) {
      // 添加字典
      case 'add':
        this.setState({ dictItem: null, editable: false });
        break;
      // 删除部门
      case 'delete':
        // 对话框
        confirm({
          title: '确认删除部门?',
          content: '一旦删除将不可恢复',
          onOk() {
            dispatch(
              createAction('dept/deleteDepart')({
                departId: departId || selectedKeys[0],
              })
            );
          },
        });
        break;
      default:
        break;
    }
  };
  // 菜单
  _menus = (
    <Menu onClick={this._handleDictMenuClick} selectedKeys={['add']}>
      <Menu.Item key="add">添加字典</Menu.Item>
      <Menu.Item key="delete">删除</Menu.Item>
    </Menu>
  );
  // 下拉菜单
  _dropdown = (
    <Dropdown overlay={this._menus} trigger={['click']}>
      <a>
        <Icon type="plus" className={styles.icon} />
      </a>
    </Dropdown>
  );
  // 字典选中
  _onDictSelect = (selectedKeys, e) => {
    const { dictTree } = this.props;
    // 查询item
    const dictItem = getTreeItem(dictTree, selectedKeys.join());
    console.log(dictItem);

    // state
    this.setState({ selectedKeys, dictItem });
  };
  // 渲染父级字典
  _renderDictSelect() {
    const { dictTree } = this.props;
    const { editable } = this.state;
    return (
      <TreeSelect
        style={{ width: 268 }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        disabled={editable}
        // onChange={this._onDeptChange}
      >
        {getTreeNode(dictTree)}
      </TreeSelect>
    );
  }
  // 编辑
  _onEditClick = () => {
    this.setState({
      editable: false,
    });
  };
  // 确定
  _onSaveClick = () => {
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const { dispatch, form } = this.props;
      dispatch(
        createActions('dict/addSubDict')(fieldsValue)(() => {
          // 编辑
          this.setState({ editable: true });
        })
      );
    });
  };
  // 渲染
  render() {
    const { onCancel, visible, dictTree, form, dictTreeLoading } = this.props;
    const { selectedKeys, dictItem, editable } = this.state;
    return (
      <Modal
        width="50%"
        destroyOnClose
        title="查看/编辑字典"
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        <Row>
          {/* 显示 */}
          <Col span={16} push={8}>
            <div className={styles.show}>
              {/* 父级字典 */}
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父级字典">
                {form.getFieldDecorator('parentId', {
                  initialValue: dictItem && dictItem.parentId,
                  rules: [{ required: true, message: '父级字典不能为空' }],
                })(this._renderDictSelect())}
              </FormItem>
              {/* 字典名称 */}
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典名称">
                {form.getFieldDecorator('dictValue', {
                  initialValue: dictItem && dictItem.name,
                  rules: [{ required: true, message: '输入字典名称最多15', max: 15 }],
                })(<Input placeholder="字典名称" disabled={editable} />)}
              </FormItem>
              {/* 字典类型 */}
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="字典类型">
                {form.getFieldDecorator('dictKey', {
                  initialValue: dictItem && dictItem.key,
                  rules: [
                    {
                      required: true,
                      pattern: '^[a-zA-Z0-9_]+$',
                      message: '输入字典名称必须英文最多20',
                      max: 20,
                    },
                  ],
                })(<Input placeholder="字典类型(英文)(例如:sys_log_key)" disabled={editable} />)}
              </FormItem>
              {/* 排序 */}
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序">
                {form.getFieldDecorator('sort', {
                  initialValue: dictItem && dictItem.sort,
                })(
                  <InputNumber
                    style={{ width: 265 }}
                    min={0}
                    max={99999}
                    onChange={this._onSortChange}
                    disabled={editable}
                  />
                )}
              </FormItem>
              {/* 描述 */}
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
                {form.getFieldDecorator('des', {
                  initialValue: dictItem && dictItem.des,
                  rules: [{ required: false, message: '描述最多50个字符', max: 50 }],
                })(<Input placeholder="描述" disabled={editable} />)}
              </FormItem>
              {/* 按钮 */}
              <div>
                <Row type="flex" justify="center">
                  <Col style={{ marginRight: 20 }}>
                    {editable ? (
                      <Button onClick={this._onEditClick}>编辑</Button>
                    ) : (
                      <Button type="primary" onClick={this._onSaveClick}>
                        确定
                      </Button>
                    )}
                  </Col>
                  <Col>
                    <Button type="danger" ghost>
                      删除
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          {/* 侧栏 */}
          <Col span={8} pull={16}>
            <div>
              {/* 输入框 */}
              <Input addonAfter={this._dropdown} placeholder="搜索字典" />
              {/* tree */}
              <Spin spinning={dictTreeLoading}>
                {selectedKeys.length > 0 && (
                  <DirectoryTree
                    defaultSelectedKeys={selectedKeys}
                    defaultExpandAll
                    onSelect={this._onDictSelect}
                  >
                    {getDirectoryTreeNode(dictTree)}
                  </DirectoryTree>
                )}
              </Spin>
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}
