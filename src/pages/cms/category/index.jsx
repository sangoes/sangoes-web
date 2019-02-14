import React, { Component } from 'react';
import styles from './index.less';
import BaseLayout from '@/components/BaseLayout';
import { Layout, Input, Dropdown, Icon, Menu, Modal } from 'antd';
import NewCategoryPage from './new';

const { Header, Content, Footer, Sider } = Layout;
const confirm = Modal.confirm;
/**
 * 分类管理
 */
export default class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newCategoryVisible: false,
    };
  }

  // 处理分类按钮
  _handleCategoryMenuClick = e => {
    switch (e.key) {
      // 添加分类
      case 'add':
        this.setState({ newCategoryVisible: true });
        break;
      // 编辑分类
      case 'edit':
        break;
      // 删除分类
      case 'delete':
        // 对话框
        confirm({
          title: '确认删除分类?',
          content: '一旦删除将不可恢复',
          onOk() {
            dispatch(createAction('dept/deleteDepart')({}));
          },
        });
        break;
      default:
        break;
    }
  };
  // 菜单
  _menus = (
    <Menu onClick={this._handleCategoryMenuClick} selectedKeys={['add']}>
      <Menu.Item key="add">添加分类</Menu.Item>
      <Menu.Item key="edit">编辑</Menu.Item>
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
  // 添加分类取消
  _onCategoryCancel = () => {
    this.setState({ newCategoryVisible: false });
  };
  // 添加分类确定
  _handleAddCategory = () => {};
  render() {
    const { newCategoryVisible } = this.state;
    return (
      <div>
        <BaseLayout title="分类管理">
          <Layout className={styles.layout}>
            {/* 侧边栏 */}
            <Sider className={styles.sider} width={220}>
              {/* 搜索 */}
              <Input className={styles.input} addonAfter={this._dropdown} placeholder="搜索分类" />
              {/* 分类列表 */}
              {/* <div className={styles.tree}>
                  <DirectoryTree
                    defaultSelectedKeys={selectedKeys}
                    defaultExpandAll
                    onSelect={this._onDepartSelect}
                  >
                    {getDirectoryTreeNode(departTree)}
                  </DirectoryTree>
                </div> */}
            </Sider>
          </Layout>
        </BaseLayout>
        {/* 添加分类 */}
        {newCategoryVisible && (
          <NewCategoryPage
            visible={newCategoryVisible}
            onCancel={this._onCategoryCancel}
            onOkHandle={this._handleAddCategory}
          />
        )}
      </div>
    );
  }
}
