import React, { Component } from 'react';
import { Modal, Transfer, Row, Col } from 'antd';
import styles from '../index.less';
import { createActions } from '@/utils';
import { connect } from 'dva';

/**
 * 绑定角色
 */
@connect(({ user }) => ({
  ...user,
}))
export default class BindRolePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      targetKeys: [],
      dataSource: [],
    };
  }
  componentDidMount() {
    const user = this.props.record;
    this.props.dispatch(
      createActions('user/getBindRole')(user.id)(() => {
        const { keys, roles } = this.props;
        this.setState({ targetKeys: keys, dataSource: roles });
      })
    );
  }

  componentWillReceiveProps(nextProps) {}
  //   过滤选项
  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  };
  //   改变
  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };
  // 确定
  _onOkHandle = () => {
    const { handleAdd } = this.props;
    handleAdd(this.state.targetKeys);
  };

  render() {
    const { targetKeys, dataSource } = this.state;
    const { visible, onCancel } = this.props;
    return (
      <Modal
        destroyOnClose
        title="绑定角色"
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        <Row type="flex" justify="center">
          <Col>
            <Transfer
              dataSource={dataSource}
              showSearch
              titles={['未选中', '选中']}
              rowKey={record => record.id}
              filterOption={this.filterOption}
              targetKeys={targetKeys}
              onChange={this.handleChange}
              render={item => item.roleName}
            />
          </Col>
        </Row>
      </Modal>
    );
  }
}
