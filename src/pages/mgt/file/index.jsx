import React, { Component, Fragment } from 'react';
import BaseLayout from '@/components/BaseLayout';
import styles from './index.less';
import { Button, Upload, message, Divider } from 'antd';
import { createActions, createAction } from '@/utils';
import { UPLOAD_FILE, PAGE_FILE } from '@/action/mgt/file';
import { connect } from 'dva';
import { parse } from 'qs';
import StandardTable from '@/components/StandardTable';
import moment from 'moment';

/**
 * @description 文件管理
 * @author jerrychir
 * @export
 * @class FileMgt
 * @extends {Component}
 */
@connect(({ file, loading }) => ({ ...file, fileLoading: loading.models.file }))
export default class FileMgt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      uploadLoading: false,
    };
  }

  /**
   * @description 渲染完成
   * @memberof FileMgt
   */
  componentDidMount = () => {
    // 获取分页
    this._getFilePageFromNet();
  };

  /**
   * @description 上传文件
   * @memberof FileMgt
   */
  _uploadFile = file => {
    this.props.dispatch(createActions(UPLOAD_FILE)({ file: file })(() => {}));
  };

  /**
   * @description table列表
   * @memberof FileMgt
   */
  columns = [
    {
      title: '文件名',
      dataIndex: 'title',
      render: (text, record, index) => (
        <a href={record.convertPath} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: '扩展名',
      dataIndex: 'extName',
    },
    {
      title: '创建时间',
      dataIndex: 'crtTime',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <Button size="small" onClick={() => window.open(record.convertPath)}>
            查看
          </Button>
          <Divider type="vertical" />
          <Button size="small" onClick={() => this._checkDict(record)}>
            更多
          </Button>
        </Fragment>
      ),
    },
  ];
  /**
   * @description 获取分页
   * @memberof FileMgt
   */
  _getFilePageFromNet = params => {
    this.props.dispatch(createAction(PAGE_FILE)(params));
  };
  /**
   * @description 表格变化
   * @memberof FileMgt
   */
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
    this._getFilePageFromNet(params);
  };
  /**
   * @description 行选择
   * @memberof FileMgt
   */
  _handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof FileMgt
   */
  render() {
    const { selectedRows, uploadLoading } = this.state;
    const { fileLoading, filePage } = this.props;
    // 获取token
    const token = sessionStorage.getItem('access_token');
    const access_token = parse(token).value;
    // 改变this
    const _this = this;
    // 上传props
    const uploadProps = {
      showUploadList: false,
      name: 'file',
      action: '/api/admin/file/upload',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      onChange(info) {
        _this.setState({ uploadLoading: true });
        if (info) {
          const code = info.file.response && info.file.response.code;
          if (code === 200) {
            // 获取分页
            _this._getFilePageFromNet();
            _this.setState({ uploadLoading: false });
            message.success(info.file.response.msg);
          } else if (code > 300) {
            _this.setState({ uploadLoading: false });
            message.error(info.file.response.msg);
          }
        }
      },
    };
    return (
      <div>
        <BaseLayout title={'文件管理'}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Upload {...uploadProps}>
                <Button icon="plus" type="primary" loading={uploadLoading}>
                  上传文件
                </Button>
              </Upload>
              {selectedRows.length > 0 && (
                <span>
                  <Button type="danger" ghost onClick={this._onBatchDeleteArticleClick}>
                    批量删除
                  </Button>
                </span>
              )}
            </div>
            {/* 列表 */}
            <StandardTable
              rowKey="id"
              selectedRows={selectedRows}
              loading={fileLoading}
              data={filePage}
              columns={this.columns}
              onSelectRow={this._handleSelectRows}
              onChange={this._handleStandardTableChange}
            />
          </div>
        </BaseLayout>
      </div>
    );
  }
}
