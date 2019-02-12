import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.less';
import BaseLayout from '@/components/BaseLayout';
import StandardTable from '@/components/StandardTable';
import { createAction } from '@/utils';
import moment from 'moment';
import { Button, Form, Row, Col, Icon, Input, Select } from 'antd';
import CheckLogPage from './check';
import { LOG_FILTER } from '@/constants/dict';

const FormItem = Form.Item;
const Option = Select.Option;
/**
 * @description 日志管理
 * @author jerrychir
 * @export
 * @class LogMgtPage
 * @extends {PureComponent}
 */
@Form.create()
@connect(({ app, loading, log }) => ({
  ...app,
  ...log,
  logLoading: loading.effects['log/logPage'],
  dictsLoading: loading.effects['app/listDict'],
}))
export default class LogMgtPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expandForm: false,
      selectedRows: [],
      checkLogVisible: false,
      logItem: null,
      defaultDict: null,
    };
  }

  // 渲染完成
  componentDidMount = () => {
    // 获取日志筛选选项
    this.props.dispatch(createAction('app/listDict')(LOG_FILTER));
    // 获取日志分页
    this._getLogPageNet();
  };
  componentWillReceiveProps = nextProps => {
    if (nextProps.listDict && nextProps.listDict.length > 0) {
      this.setState({ defaultDict: nextProps.listDict[0].key });
    }
  };

  // 获取日志分页
  _getLogPageNet = params => {
    this.props.dispatch(createAction('log/logPage')({ sorter: 'crtTime_descend', ...params }));
  };
  // table列表
  columns = [
    {
      title: '方法名',
      dataIndex: 'title',
      render: (text, record) => (
        <a href="javascript:;" onClick={() => this._onShowCheckLog(record)}>
          {text}
        </a>
      ),
    },
    {
      title: '请求方法',
      dataIndex: 'method',
    },
    {
      title: '请求IP',
      dataIndex: 'remote',
    },
    // {
    //   title: '请求URI',
    //   width: 100,
    //   dataIndex: 'uri',
    //   // className: styles.urlText,
    // },
    // {
    //   title: '参数',
    //   dataIndex: 'params',
    // },
    {
      title: '耗时(ms)',
      dataIndex: 'elapsed',
    },
    {
      title: '请求用户',
      dataIndex: 'creator',
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
   * @description 选择
   * @memberof LogMgtPage
   */
  _onSelectChange = value => {
    this.setState({ defaultDict: value });
  };
  /*
   * 简单搜索
   */
  _renderSimpleForm() {
    const {
      form: { getFieldDecorator },
      dictsLoading,
      listDict,
    } = this.props;
    const { defaultDict } = this.state;
    // 封装字典
    const dictData = listDict.map(item => (
      <Option key={item.key} value={item.key}>
        {item.value}
      </Option>
    ));
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row type="flex" className={styles.formSimple}>
          <Col span={3} order={1}>
            <Select value={defaultDict} loading={dictsLoading} onChange={this._onSelectChange}>
              {dictData}
            </Select>
          </Col>
          <Col span={6} order={1} className={styles.input}>
            <FormItem>{getFieldDecorator('name')(<Input placeholder="筛选关键词" />)}</FormItem>
          </Col>
          <Col span={6} order={2}>
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
  // close log check关闭查看日志详情
  _onCloseCheckLog = () => {
    this.setState({ checkLogVisible: false });
  };
  // 显示日志详情
  _onShowCheckLog = item => {
    this.setState({ checkLogVisible: true, logItem: item });
  };

  // 渲染
  render() {
    const { selectedRows, checkLogVisible, logItem } = this.state;
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
          {/* 查看日志 */}
          {checkLogVisible && (
            <CheckLogPage
              visible={checkLogVisible}
              onClose={this._onCloseCheckLog}
              item={logItem}
            />
          )}
        </div>
      </BaseLayout>
    );
  }
}
