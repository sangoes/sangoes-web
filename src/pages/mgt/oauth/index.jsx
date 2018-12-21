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
} from 'antd';
import { createActions, createAction } from '@/utils';
import { connect } from 'dva';
import NewOAuthPage from './new';
import StandardTable from '@/components/StandardTable';

const approve = ['是', '否'];

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
  componentDidMount = () => {
    // 获取授权分页
    this._getOAuthPage();
  };
  // 网络获取分页授权
  _getOAuthPage(params) {
    this.props.dispatch(createAction('oauth/oauthPage')(params));
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
  // 更多下拉
  moreMenu = (
    <Menu onClick={this._handleMenuClick} selectedKeys={['edit']}>
      <Menu.Item key="edit">修改</Menu.Item>
      <Menu.Item key="bind">绑定角色</Menu.Item>
      <Menu.Item key="reset">重置密码</Menu.Item>
    </Menu>
  );
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
        let value = val ? 0 : 1;
        return <div style={{ textAlign: 'center' }}>{approve[value]}</div>;
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
          <Button
            size="small"
            type="danger"
            ghost
            onClick={() => {
              this._deleteUser(record);
            }}
          >
            删除
          </Button>
          <Divider type="vertical" />
          <Dropdown overlay={this.moreMenu} trigger={['click']}>
            <Button
              size="small"
              onClick={() => {
                this.setState({ userRecord: record });
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
  render() {
    const { form, oauthList } = this.props;
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
          <StandardTable
            rowKey="id"
            selectedRows={selectedRows} // loading={userLoading}
            data={oauthList}
            columns={this.columns}
            onSelectRow={this._handleSelectRows}
            onChange={this._handleStandardTableChange}
          />
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
