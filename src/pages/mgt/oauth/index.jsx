import React, { Component } from 'react';
import { PageHeader } from 'ant-design-pro';
import styles from './index.less';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import { createActions, createAction } from '@/utils';
import { connect } from 'dva';
import NewOAuthPage from './new';

/**
 * 授权管理
 */
@Form.create()
@connect(({ oauth }) => ({ ...oauth }))
export default class OAuthMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedRows: [], newOAuthVisible: false };
  }
  // 显示/隐藏新建授权
  _toggleNewOAuthPage = val => {
    this.setState({ newOAuthVisible: val });
  };
  // 添加或更新授权
  _onOkOAuthHandle = fields => {
    const { dispatch, form } = this.props;
    fields.authorizedGrantTypes = fields.authorizedGrantTypes.join(',');
    dispatch(
      createActions('oauth/addOAuth')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this._toggleNewOAuthPage(false);
      })
    );
  };
  render() {
    const { form } = this.props;
    const { selectedRows, newOAuthVisible } = this.state;
    return (
      <div>
        <PageHeader title="授权管理" />
        {/* 详细 */}
        <Card bordered={false} className={styles.card}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this._toggleNewOAuthPage(true)}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button type="danger" ghost onClick={this._onBatchDeleteUserClick}>
                    批量删除
                  </Button>
                </span>
              )}
            </div>
          </div>
        </Card>
        {/* 新建授权 */}
        {newOAuthVisible && (
          <NewOAuthPage
            visible={newOAuthVisible}
            form={form}
            onCancel={() => this._toggleNewOAuthPage(false)}
            onOkHandle={this._onOkOAuthHandle}
          />
        )}
      </div>
    );
  }
}
