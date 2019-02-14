import React, { Component } from 'react';
import { Menu, Icon, Dropdown, Spin } from 'antd';
import styles from './index.less';
import Link from 'umi/link';
import router from 'umi/router';
import { isUrl, urlToList, getMenusSelectKeys } from '@/utils/utils';

const { SubMenu } = Menu;

/**
 * 生成菜单
 */
export default class BaseMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //  获得菜单子节点
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name)
      .map(item => {
        return this.getSubMenuOrItem(item, parent);
      })
      .filter(item => item);
  };
  // 生成子菜单
  getSubMenuOrItem = item => {
    const { link } = this.props;
    if (item.children && item.children.length > 0 && item.children.some(child => child.name)) {
      const { name, icon, id, children } = item;
      return (
        <SubMenu
          key={id}
          title={
            <span>
              {icon && <Icon type={icon} />}
              <span>{name}</span>
            </span>
          }
        >
          {this.getNavMenuItems(children)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.id}>
        {/* 判断是否为网址 */}
        {link ? (
          isUrl(item.url) ? (
            // 网站跳转
            <span
              onClick={() => {
                router.push({
                  pathname: '/url/' + item.menuCode,
                  query: {
                    item: item,
                  },
                });
              }}
            >
              {item.icon && <Icon type={item.icon} />}
              <span>{item.name}</span>
            </span>
          ) : (
            <Link to={item.url || '/'}>
              <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>
            </Link>
          )
        ) : (
          <span>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </span>
        )}
      </Menu.Item>
    );
  };
  render() {
    const {
      menuData,
      onSelect,
      openKeys,
      selectedKeys,
      theme,
      location,
      style,
      loading,
    } = this.props;
    let keys = [];
    if (location) {
      keys = getMenusSelectKeys(menuData, location.pathname);
    }
    if (!keys.length) {
      keys = selectedKeys;
    }
    return (
      <div>
        <Spin spinning={loading}>
          <Menu
            mode="inline"
            theme={theme || 'dark'}
            selectedKeys={
              keys // defaultSelectedKeys={selectedKeys}
            }
            defaultOpenKeys={openKeys}
            style={style || { minHeight: '100vh' }}
            onSelect={onSelect}
          >
            {this.getNavMenuItems(menuData)}
          </Menu>
        </Spin>
      </div>
    );
  }
}
