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
