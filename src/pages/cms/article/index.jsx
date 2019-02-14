import React, { Component } from 'react';
import styles from './index.less';
import BaseLayout from '@/components/BaseLayout';
import { Button } from 'antd';
import NewArticlePage from './new';

/**
 * 文章管理
 */
export default class ArticleMgt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [],
      newArticleVisible: false,
    };
  }
  // 新建文章
  _newArticleClick = () => {
    this.setState({ newArticleVisible: true });
  };
  // 批量删除文章
  _onBatchDeleteArticleClick = () => {};
  // 新建文章取消
  _onArticleCancel = () => {
    this.setState({ newArticleVisible: false });
  };
  // 新建文章确定
  _handleAddArticle = () => {};
  // 渲染
  render() {
    const { selectedRows, newArticleVisible } = this.state;
    return (
      <div>
        <BaseLayout title="文章管理">
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this._newArticleClick}>
                新建文章
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button type="danger" ghost onClick={this._onBatchDeleteArticleClick}>
                    批量删除
                  </Button>
                </span>
              )}
            </div>
          </div>
        </BaseLayout>
        {/* 新建文章 */}
        {newArticleVisible && (
          <NewArticlePage
            visible={newArticleVisible}
            onCancel={this._onArticleCancel}
            onOkHandle={this._handleAddArticle}
          />
        )}
      </div>
    );
  }
}
