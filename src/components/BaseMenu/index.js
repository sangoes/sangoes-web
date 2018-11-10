/*
 * @Author: jerrychir @sangoes
 * @Date: 2018-11-09 16:17:27
 * @Last Modified by: jerrychir @sangoes
 * @Last Modified time: 2018-11-10 13:02:32
 */
import React, { Component } from 'react';
import { Menu, Icon, Dropdown } from 'antd';
import styles from './index.less';

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
        <span>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.name}</span>
        </span>
      </Menu.Item>
    );
  };

  render() {
    const { menuData, onSelect, openKeys, selectedKeys } = this.props;

    return (
      <div>
        {selectedKeys.length > 0 && (
          <Menu
            mode="inline"
            defaultSelectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
            style={{ minHeight: '100vh' }}
            onSelect={onSelect}
          >
            {this.getNavMenuItems(menuData)}
          </Menu>
        )}
      </div>
    );
  }
}
