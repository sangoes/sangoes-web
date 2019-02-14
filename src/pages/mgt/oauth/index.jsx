import React, { Component, Fragment } from 'react';
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
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Modal,
} from 'antd';
import { createActions, createAction } from '@/utils';
import { connect } from 'dva';
import NewOAuthPage from './new';
import StandardTable from '@/components/StandardTable';

const confirm = Modal.confirm;
const approve = ['是', '否'];

/**
 * 授权管理
 */
@Form.create()
@connect(({ oauth, loading }) => ({ ...oauth, oauthLoading: loading.models.oauth }))
export default class OAuthMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedRows: [], oauthItem: null };
  }
  componentDidMount = () => {
    // 获取授权分页
    this._getOAuthPage();
  };
  // 网络获取分页授权
  _getOAuthPage(params) {
    this.props.dispatch(createAction('oauth/oauthPage')(params));
  }
  // 添加或更新授权
  _onOkOAuthHandle = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('oauth/addOAuth')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewOAuthPage.hide();
      })
    );
  };
  // 更新授权
  _handleUpdateOAuth = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('oauth/updateOAuth')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewOAuthPage.hide();
      })
    );
  };
  // 下拉点击
  _handleMenuClick = e => {
    const { oauthItem } = this.state;
    switch (e.key) {
      // 更新
      case 'edit':
        this.NewOAuthPage.showUpdate(oauthItem);
        break;
      default:
        break;
    }
  };
  // 更多下拉
  moreMenu = (
    <Menu onClick={this._handleMenuClick} selectedKeys={['edit']}>
      <Menu.Item key="edit">修改</Menu.Item>
    </Menu>
  );
  // 删除授权
  _deleteOAuth = item => {
    const { dispatch } = this.props;
    confirm({
      title: '确定删除授权?',
      content: '一旦删除将不可恢复',
      onOk() {
        dispatch(createAction('oauth/deleteOAuth')({ oauthId: item.id }));
      },
    });
  };
  // table列表
  columns = [
    {
      title: '客户端ID',
      dataIndex: 'clientId',
    },
    {
      title: '客户端密钥',
      dataIndex: 'clientSecret',
    },
    {
      title: '授权模式',
      dataIndex: 'authorizedGrantTypes',
    },
    {
      title: '授权域',
      dataIndex: 'scope',
    },
    {
      title: '自动放行',
      dataIndex: 'autoapprove',
      render(val) {
        return <div style={{ textAlign: 'center' }}>{approve[val]}</div>;
      },
    },
    {
      title: '过期时间',
      dataIndex: 'accessTokenValidity',
    },
    {
      title: '刷新时间',
      dataIndex: 'refreshTokenValidity',
    },
    {
      title: '回调地址',
      dataIndex: 'webServerRedirectUri',
    },
    {
      title: '权限',
      dataIndex: 'resourceIds',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <Button size="small" type="danger" ghost onClick={() => this._deleteOAuth(record)}>
            删除
          </Button>
          <Divider type="vertical" />
          <Dropdown overlay={this.moreMenu} trigger={['click']}>
            <Button
              size="small"
              onClick={() => {
                this.setState({ oauthItem: record });
              }}
            >
              更多 <Icon type="down" />
            </Button>
          </Dropdown>
        </Fragment>
      ),
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
    this._getOAuthPage(params);
  };
  // 批量删除授权
  _onBatchDeleteOAuthClick = () => {
    const { selectedRows } = this.state;
    const { dispatch } = this.props;
    const keys = selectedRows.map(item => {
      return item.id;
    });
    confirm({
      title: '确定批量删除授权?',
      content: '一旦删除将不可恢复',
      onOk() {
        dispatch(createAction('oauth/batchDeleteOAuth')({ oauthIds: keys }));
      },
    });
  };
  render() {
    const { form, oauthList, oauthLoading } = this.props;
    const { selectedRows } = this.state;
    return (
      <div>
        <PageHeader title="授权管理" />
        {/* 详细 */}
        <Card bordered={false} className={styles.card}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.NewOAuthPage.show()}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button type="danger" ghost onClick={this._onBatchDeleteOAuthClick}>
                    批量删除
                  </Button>
                </span>
              )}
            </div>
          </div>
          <StandardTable
            rowKey="id"
            selectedRows={selectedRows}
            loading={oauthLoading}
            data={oauthList}
            columns={this.columns}
            onSelectRow={this._handleSelectRows}
            onChange={this._handleStandardTableChange}
          />
        </Card>
        {/* 新建授权 */}
        <NewOAuthPage
          ref={ref => (this.NewOAuthPage = ref)}
          form={form}
          onOkHandle={this._onOkOAuthHandle}
          onUpdateHandle={this._handleUpdateOAuth}
        />
      </div>
    );
  }
}
