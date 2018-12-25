import React, { Component } from 'react';
import { Layout } from 'antd';
import styles from './index.less';
import BaseLayout from '@/components/BaseLayout';
import BaseMenu from '@/components/BaseMenu';
import ProfileSettingPage from './profile';
import router from 'umi/router';
import _ from 'lodash';

const { Sider, Content } = Layout;
/**
 * 个人设置
 */
export default class SettingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedKeys: ['1'], title: '基础设置' };
  }
  componentDidMount = () => {
    const { selectedKeys } = this.state;
    this._pushToPage(selectedKeys[0]);
  };

  _menuSider = [
    { id: '1', name: '基础设置', url: '/account/setting/profile' },
    { id: '2', name: '安全设置', url: '/account/setting/security' },
  ];
  // 菜单选择
  _onMenuSelect = ({ item, key, selectedKeys }) => {
    const element = _.find(this._menuSider, item => item.id === key);
    this.setState({ selectedKeys, title: element.name });
    router.push(element.url);
  };
  // push to new page
  _pushToPage = key => {
    const element = _.find(this._menuSider, item => item.id === key);
    router.push(element.url);
  };
  render() {
    const { children } = this.props;
    const { selectedKeys, title } = this.state;
    return (
      <div>
        <BaseLayout title="个人设置">
          <Sider className={styles.sider} width={220}>
            <BaseMenu
              style={{ minHeight: '100%' }}
              theme="light"
              link={false}
              selectedKeys={selectedKeys}
              menuData={this._menuSider}
              onSelect={this._onMenuSelect}
            />
          </Sider>
          <Content className={styles.rightContent}>
            {/* 二级页面标题 */}
            <div className={styles.title}>{title}</div>
            {children}
          </Content>
        </BaseLayout>
      </div>
    );
  }
}
