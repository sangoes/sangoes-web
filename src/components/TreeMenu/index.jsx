import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import { getTreeNode } from '@/utils/reactUtils';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

/**
 * 树形菜单
 */
export default class TreeMenu extends Component {
  static propTypes = {
    treeData: PropTypes.array,
  };

  onSelect = () => {
    console.log('Trigger Select');
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };
  // 渲染
  render() {
    // 渲染node
    const { treeData } = this.props;
    return (
      <div style={{ minHeight: '100vh' }}>
        <DirectoryTree defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
          {getTreeNode(treeData)}
        </DirectoryTree>
      </div>
    );
  }
}
