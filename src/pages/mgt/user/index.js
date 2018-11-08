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
import { createActions, createAction } from '@/utils';
import { connect } from 'dva';

/**
 * 用户管理
 */
@Form.create()
@connect(({ user, loading }) => ({
  ...user,
}))
export default class UserMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedRows: [] };
  }
  // 加载完成
  componentDidMount() {
    // 网络获取分页用户
    this._getUserPageNet();
  }
  // 网络获取分页用户
  _getUserPageNet() {
    this.props.dispatch(createAction('user/getUserPage')());
  }
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
  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '手机',
      dataIndex: 'mobile',
    },
    {
      title: '创建时间',
      dataIndex: 'crtTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'updTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];
  render() {
    const { selectedRows } = this.state;
    const { userList } = this.props;
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
            <StandardTable
              selectedRows={selectedRows}
              // loading={loading}
              data={userList} // onChange={this.handleStandardTableChange} // onSelectRow={this.handleSelectRows}
              columns={this.columns}
            />
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
