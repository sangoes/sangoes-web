import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import BaseLayout from '@/components/BaseLayout';
import StandardTable from '@/components/StandardTable';
import { createAction } from '@/utils';
import moment from 'moment';
import { Button, Form, Row, Col, Icon, Input, Select } from 'antd';

const FormItem = Form.Item;
/**
 * @description 日志管理
 * @author jerrychir
 * @export
 * @class LogMgtPage
 * @extends {PureComponent}
 */
@Form.create()
@connect(({ loading, log }) => ({ ...log, logLoading: loading.effects['log/logPage'] }))
export default class LogMgtPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { expandForm: false, selectedRows: [] };
  }

  // 渲染完成
  componentDidMount = () => {
    // 获取日志分页
    this._getLogPageNet();
  };
  // 获取日志分页
  _getLogPageNet = params => {
    this.props.dispatch(createAction('log/logPage')({ sorter: 'crtTime_descend', ...params }));
  };
  // table列表
  columns = [
    {
      title: '请求方法',
      dataIndex: 'method',
    },
    {
      title: '请求IP',
      dataIndex: 'remote',
    },
    {
      title: '请求URI',
      dataIndex: 'uri',
    },

    {
      title: '请求用户',
      dataIndex: 'userName',
    },
    {
      title: '请求状态',
      dataIndex: 'status',
    },
    {
      title: '请求时间',
      dataIndex: 'crtTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  // 选择
  _handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  // table变化
  _handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {
        ...obj,
      };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    // 网络获取
    this._getLogPageNet(params);
  };
  /**
   * 简单搜索
   */
  _renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="规则名称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>

          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }
  /**
   * 搜索
   */
  _renderForm() {
    const { expandForm } = this.state;
    return this._renderSimpleForm();
  }
  // 渲染
  render() {
    const { selectedRows } = this.state;
    const { logLoading, logList } = this.props;
    return (
      <BaseLayout title={'日志管理'}>
        {/* 列表 */}
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this._renderForm()}</div>
          <StandardTable
            rowKey="id"
            selectedRows={selectedRows}
            loading={logLoading}
            data={logList}
            columns={this.columns}
            onSelectRow={this._handleSelectRows}
            onChange={this._handleStandardTableChange}
          />
        </div>
      </BaseLayout>
    );
  }
}
