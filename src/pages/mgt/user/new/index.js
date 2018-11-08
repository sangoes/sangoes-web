import React, { Component } from 'react';
import { Modal, Form, Input, Button, Row } from 'antd';
import styles from '../index.less';
import { randomLetterAndNums } from '@/utils/utils';

const FormItem = Form.Item;
/**
 * 新建用户
 */
export default class NewUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      username: null,
    };
  }

  // 显示
  show() {
    this.setState({ modalVisible: true });
  }
  // 隐藏
  hide() {
    this.setState({ modalVisible: false });
  }
  // 确认
  _onOkHandle() {
    const { form, onOkHandle } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // 清空form
      // form.resetFields();
      // 调用
      onOkHandle(fieldsValue);
    });
  }

  render() {
    const { form, onOkHandle } = this.props;
    const { username } = this.state;
    return (
      <Modal
        destroyOnClose
        title="新建用户"
        visible={this.state.modalVisible}
        onCancel={() => this.hide()}
        onOk={() => {
          this._onOkHandle();
        }}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名">
          {form.getFieldDecorator(
            'username',
            { initialValue: username },
            {
              rules: [
                { required: true, message: '输入4-16位的用户名,只能英文和数字！', min: 4, max: 16 },
              ],
            }
          )(
            <Input
              placeholder="输入4-16位的用户名,只能英文和数字"
              addonAfter={
                <a
                  onClick={() => {
                    // 生成随机用户名
                    const random = randomLetterAndNums().slice(2, 18);
                    this.setState({ username: random });
                  }}
                >
                  随机
                </a>
              }
            />
          )}
        </FormItem>

        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="姓名">
          {form.getFieldDecorator('realName', {
            rules: [{ required: true, message: '输入1-4位的姓名！', min: 1, max: 4 }],
          })(<Input placeholder="输入1-4位的姓名" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机">
          {form.getFieldDecorator('mobile', {
            rules: [
              { required: true, message: '输入11位的手机号码！' },
              {
                pattern: '^((13[0-9])|(15[^4])|(18[0-9])|(17[0-9])|(147))\\d{8}$',
                message: '不符合手机号码格式',
              },
            ],
          })(<Input placeholder="输入11位的手机号码" />)}
        </FormItem>
        {/* 默认密码 */}
        <div className={styles.suggestion}>默认密码:888888</div>
      </Modal>
    );
  }
}
