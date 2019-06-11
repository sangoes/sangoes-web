import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { randomLetterAndNums } from '@/utils/utils';
import { createAction } from '@/utils';
import JSEncrypt from 'jsencrypt';
import { connect } from 'dva';

const FormItem = Form.Item;
/**
 * @description 修改密码
 * @author jerrychir
 * @export
 * @class PwdMgt
 * @extends {Component}
 */
@Form.create()
@connect(({ app }) => ({ ...app }))
export default class ChangePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicRandom: '',
    };
  }
  /**
   * @description 渲染完成
   * @memberof ChangePwd
   */
  componentDidMount = () => {
    this._handleRandomPublicKey();
  };

  /**
   * @description 获取公钥
   * @author jerrychir
   * @memberof ChangePwd
   */
  _handleRandomPublicKey() {
    //生成随机数
    const random = randomLetterAndNums();
    this.setState({ publicRandom: random });
    //服务器获取公钥
    this.props.dispatch(createAction('app/getPublicKeyByRandom')(random));
  }
  /**
   * @description 确定
   * @memberof ChangePwd
   */
  _onOkHandle = () => {
    const { form, onOkHandle, publicKey } = this.props;
    const { publicRandom } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // let crypt = new JSEncrypt();
      // crypt.setPublicKey(publicKey);
      // fieldsValue.oldPwd = crypt.encrypt(fieldsValue.oldPwd);
      // fieldsValue.newPwd = crypt.encrypt(fieldsValue.newPwd);
      // fieldsValue.publicRandom = publicRandom;
      // 调用
      onOkHandle(fieldsValue);
    });
  };

  /**
   * @description 渲染
   * @author jerrychir
   * @returns
   * @memberof ChangePwd
   */
  render() {
    const { visible, onCancel, form } = this.props;
    return (
      <Modal
        destroyOnClose
        title={'修改密码'}
        visible={visible}
        onCancel={onCancel}
        onOk={this._onOkHandle}
      >
        {/* 原始密码 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="原始密码">
          {form.getFieldDecorator('oldPwd', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" placeholder="原始密码" />)}
        </FormItem>
        {/* 新密码 */}
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="新密码">
          {form.getFieldDecorator('newPwd', {
            rules: [
              {
                required: true,
                pattern: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$',
                message: '必须包含字母和数字的组合，不能使用特殊字符，长度在6-20之间',
              },
            ],
          })(<Input type="password" placeholder="新密码" />)}
        </FormItem>
      </Modal>
    );
  }
}
