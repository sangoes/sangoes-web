import React, { Component, Fragment } from 'react';
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
import BindRolePage from './bind';
import BindDeptPage from './bind/dept';

const confirm = Modal.confirm;
const webSocket = new WebSocket('ws://127.0.0.1:9191/web/msg?id=34567');
/**
 * 用户管理
 */
@Form.create()
@connect(({ user, loading }) => ({
  ...user,
  userLoading: loading.models.user,
}))
export default class UserMgtPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bindRoleVisible: false,
      bindDepartVisible: false,
      selectedRows: [],
      userRecord: null,
    };
  }
  // 加载完成
  componentDidMount() {
    // 网络获取分页用户
    this._getUserPageNet();
  }
  // 网络获取分页用户
  _getUserPageNet(params) {
    this.props.dispatch(createAction('user/getUserPage')(params));
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
    this._getUserPageNet(params);
  };
  // 下拉点击
  _handleMenuClick = e => {
    switch (e.key) {
      // 更新
      case 'edit':
        const item = this.state.userRecord;
        this.NewUserPage.showUpdate(item);
        break;
      // 绑定角色
      case 'bind':
        this.setState({ bindRoleVisible: true });
        break;
      // 绑定部门
      case 'bindDept':
        this.setState({ bindDepartVisible: true });
        break;
      // 重置密码
      case 'reset':
        break;
      default:
        break;
    }
  };
  // 更多下拉
  moreMenu = (
    <Menu onClick={this._handleMenuClick} selectedKeys={['edit']}>
      <Menu.Item key="edit">修改</Menu.Item>
      <Menu.Item key="bind">绑定角色</Menu.Item>
      <Menu.Item key="bindDept">绑定部门</Menu.Item>
      <Menu.Item key="reset">重置密码</Menu.Item>
    </Menu>
  );
  // table列表
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

  // 绑定角色
  _handleBindRole = fields => {
    const { dispatch } = this.props;
    dispatch(
      createActions('user/bindRole')({
        userId: this.state.userRecord.id,
        roleIds: fields.join(','),
      })(() => {
        // 关闭弹窗
        this._onBinRoleCancel();
      })
    );
  };
  // 绑定角色
  _handleBindDepart = fields => {
    const { dispatch } = this.props;
    const { userRecord } = this.state;
    dispatch(
      createActions('user/bindDepart')({
        userId: userRecord.id,
        departIds: fields,
      })(() => {
        // 关闭弹窗
        this._onBinDepartCancel();
      })
    );
  };
  // 关闭角色绑定窗口
  _onBinRoleCancel = () => {
    this.setState({ bindRoleVisible: false });
  };
  // 关闭部门绑定窗口
  _onBinDepartCancel = () => {
    this.setState({ bindDepartVisible: false });
  };
  // 删除用户
  _deleteUser = item => {
    const { dispatch } = this.props;
    confirm({
      title: '确定删除用户?',
      content: '一旦删除将不可恢复',
      onOk() {
        dispatch(
          createAction('user/deleteUser')({
            userId: item.id,
          })
        );
      },
    });
  };
  // 更新用户确认
  _handleUpdateUser = fields => {
    const { dispatch, form } = this.props;
    dispatch(
      createActions('user/updateUser')(fields)(() => {
        // 清空form
        form.resetFields();
        // 关闭弹窗
        this.NewUserPage.hide();
      })
    );
  };
  // 批量删除用户
  _onBatchDeleteUserClick = () => {
    const { selectedRows } = this.state;
    const { dispatch } = this.props;
    const keys = selectedRows.map(item => {
      return item.id;
    });
    // 对话框
    confirm({
      title: '确定批量删除用户?',
      content: '一旦删除将不可恢复',
      onOk() {
        dispatch(createAction('user/batchDeleteUser')({ userIds: keys }));
      },
    });
  };

  render() {
    const { selectedRows, userRecord, bindRoleVisible, bindDepartVisible } = this.state;
    const { userList, userLoading, roles, keys } = this.props;
    // console.log('ws:', msgWS);
    // msgWS.onopen(() => {});

    return (
      <div>
        <PageHeader title="用户管理" />
        <Card bordered={false} className={styles.card}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.NewUserPage.show()}>
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
              loading={userLoading}
              data={userList}
              columns={this.columns}
              onSelectRow={this._handleSelectRows}
              onChange={this._handleStandardTableChange}
            />
          </div>
        </Card>
        {/* 新建用户 */}
        <NewUserPage
          ref={ref => (this.NewUserPage = ref)}
          form={this.props.form}
          onOkHandle={this._handleAdd}
          onUpdateHandle={this._handleUpdateUser}
        />
        {/* 绑定角色 */}
        {bindRoleVisible && (
          <BindRolePage
            visible={bindRoleVisible}
            record={userRecord}
            handleAdd={this._handleBindRole}
            onCancel={this._onBinRoleCancel}
          />
        )}
        {/* 绑定部门 */}
        {bindDepartVisible && (
          <BindDeptPage
            visible={bindDepartVisible}
            record={userRecord}
            handleAdd={this._handleBindDepart}
            onCancel={this._onBinDepartCancel}
          />
        )}
      </div>
    );
  }
}
