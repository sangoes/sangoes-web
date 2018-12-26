import React, { Component, Fragment } from 'react';
import styles from './index.less';
import StandardTable from '@/components/StandardTable';
import moment from 'moment';
import { createActions, createAction } from '@/utils';
import { connect } from 'dva';
import { Modal, Button, Form, Divider } from 'antd';
import BaseLayout from '@/components/BaseLayout';
import NewDictPage from './new';

const confirm = Modal.confirm;
/**
 * 字典管理
 */
@connect(({ dict, loading }) => ({ ...dict, dictLoading: loading.effects['dict/pageDict'] }))
@Form.create()
export default class DictMgtPage extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedRows: [], newDictVisible: false };
  }
  componentDidMount = () => {
    // 获取字典分页
    this._getDictPageFromNet();
  };
  // 网络获取字典分页
  _getDictPageFromNet = params => {
    const { dispatch } = this.props;
    dispatch(createAction('dict/pageDict')(params));
  };
  // 新建字典
  _newDictClick = () => {
    this.setState({ newDictVisible: true });
  };
  // 新建字典确认
  _handleAddDict = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('dict/addDict')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this._onNewDictCancel();
      })
    );
  };
  // 新建字典取消
  _onNewDictCancel = () => {
    this.setState({ newDictVisible: false });
  };
  // table列表
  columns = [
    {
      title: '字典名称',
      dataIndex: 'dictValue',
    },
    {
      title: '字典类型',
      dataIndex: 'dictKey',
    },
    {
      title: '描述',
      dataIndex: 'des',
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
      const newObj = { ...obj };
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
    this._getDictPageFromNet(params);
  };
  render() {
    const { dictPage, dictLoading } = this.props;
    const { selectedRows, newDictVisible } = this.state;
    return (
      <div>
        <BaseLayout title="字典管理">
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this._newDictClick}>
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
            <StandardTable
              rowKey="id"
              selectedRows={selectedRows}
              loading={dictLoading}
              data={dictPage}
              columns={this.columns}
              onSelectRow={this._handleSelectRows}
              onChange={this._handleStandardTableChange}
            />
          </div>
        </BaseLayout>
        {/* 新建字典 */}
        {newDictVisible && (
          <NewDictPage
            visible={newDictVisible}
            onOkHandle={this._handleAddDict}
            onCancel={this._onNewDictCancel}
          />
        )}
      </div>
    );
  }
}
