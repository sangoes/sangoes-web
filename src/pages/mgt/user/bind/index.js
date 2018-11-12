import React, { Component } from 'react';
import { Modal, Transfer, Row, Col } from 'antd';
import styles from '../index.less';

/**
 * 绑定角色
 */
export default class BindRolePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      targetKeys: [],
      dataSource: [],
    };
  }
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.setState({
      targetKeys: this.props.targetKeys,
      dataSource: this.props.dataSource,
    });
  }
  // 显示
  show() {
    this.setState({ modalVisible: true });
  }
  // 隐藏
  hide() {
    this.setState({ modalVisible: false });
  }
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
    return (
      <Modal
        destroyOnClose
        title="绑定角色"
        visible={this.state.modalVisible}
        onCancel={() => this.hide()}
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
