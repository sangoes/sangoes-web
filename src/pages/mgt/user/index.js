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

/**
 * 用户管理
 */
@Form.create()
export default class UserMgtPage extends Component {
  /**
   * 新建用户页面
   */
  handleNewUserModalVisible = flag => {};
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
        <NewUserPage ref={ref => (this.NewUserPage = ref)} />
      </div>
    );
  }
}
