import React, { Component } from 'react';
import moment from 'moment';
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
import { PageHeader } from 'ant-design-pro';
import StandardTable from '@/components/StandardTable';
import styles from './index.less';
import NewUserPage from './new';
import { createActions } from '@/utils';
import { connect } from 'dva';

/**
 * 用户管理
 */
@Form.create()
@connect(({ user }) => ({
  ...user,
}))
export default class UserMgtPage extends Component {
  // 加载完成
  componentDidMount() {}
  /**
   * 新建用户点击确定
   */
  _handleAdd = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('user/addUser')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewUserPage.hide();
      })
    );
  };
  render() {
    return (
      <div>
        <PageHeader title="用户管理" />
        <Card bordered={false} className={styles.card}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.NewUserPage.show()}>
                新建
              </Button>
            </div>
            {/* <StandardTable
              // selectedRows={selectedRows}
              // loading={loading}
              data={[]}
              // columns={this.columns}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            /> */}
          </div>
        </Card>
        {/* 新建用户 */}
        <NewUserPage
          ref={ref => (this.NewUserPage = ref)}
          form={this.props.form}
          onOkHandle={this._handleAdd}
        />
      </div>
    );
  }
}
