import BaseLayout from '@/components/BaseLayout';
import { Button } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import NewMsgPage from './new';
import { createActions } from '@/utils';
import { connect } from 'dva';

/**
 * @description 消息中心
 * @author jerrychir
 * @export
 * @class MsgCenterPage
 * @extends {Component}
 */
@connect(({ msg, loading }) => ({ ...msg }))
export default class MsgCenterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [],
      newMsgVisible: false,
    };
  }

  /**
   * @description 新建消息
   * @memberof MsgCenterPage
   */
  _newMsgClick = () => {
    this.setState({ newMsgVisible: true });
  };

  /**
   * @description 新建消息取消
   * @memberof MsgCenterPage
   */
  _onMsgCancel = () => {
    this.setState({ newMsgVisible: false });
  };
  /**
   * @description 新建消息确定
   * @memberof MsgCenterPage
   */
  _handleAddMsg = fields => {
    // 网络请求
    this.props.dispatch(
      createActions('msg/sendMsg')(fields)(() => {
        this._onMsgCancel();
      })
    );
  };
  // 渲染
  render() {
    const { selectedRows, newMsgVisible } = this.state;
    return (
      <div>
        <BaseLayout title="消息管理">
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this._newMsgClick}>
                新建
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
        {/* 新建消息 */}
        {newMsgVisible && (
          <NewMsgPage
            visible={newMsgVisible}
            onCancel={this._onMsgCancel}
            onOkHandle={this._handleAddMsg}
          />
        )}
      </div>
    );
  }
}
