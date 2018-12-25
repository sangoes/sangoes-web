import { TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;

/**
 * 获取树形结构
 */
export const getTreeNode = tree =>
  tree.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.id} value={item.id}>
          {getTreeNode(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.id} value={item.id} />;
  });

/**
 * 获取树形结构
 * @param {数据树形} tree
 */
export const getDirectoryTreeNode = tree =>
  tree.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.id} value={item.id}>
          {getDirectoryTreeNode(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={item.name} key={item.id} value={item.id} isLeaf />;
  });
