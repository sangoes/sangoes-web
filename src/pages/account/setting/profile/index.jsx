import React, { Component } from 'react';
import styles from './index.less';
import { Form, Input } from 'antd';
import AvatarView from '@/components/AvatarView';
import { connect } from 'dva';

const FormItem = Form.Item;
/**
 * 基础设置/个人设置
 */
@connect(({ app }) => ({ ...app }))
@Form.create()
export default class ProfileSettingPage extends Component {
  render() {
    const {
      form: { getFieldDecorator },
      userInfo: { realName, avatar, username, mobile },
    } = this.props;
    return (
      <div className={styles.profile}>
        {/* 信息列表 */}
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            {/* 姓名 */}
            <FormItem label="姓名">
              {getFieldDecorator('realName', {
                initialValue: realName,
                rules: [{ required: true, message: '' }],
              })(<Input placeholder="真实姓名" />)}
            </FormItem>
            {/* 用户名 */}
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                initialValue: username,
                rules: [{ required: true, message: '' }],
              })(<Input placeholder="用户名" />)}
            </FormItem>
            {/* 手机 */}
            <FormItem label="手机">
              {getFieldDecorator('mobile', {
                initialValue: mobile,
                rules: [{ required: true, message: '' }],
              })(<Input placeholder="手机" />)}
            </FormItem>
          </Form>
        </div>
        {/* 上传头像 */}
        <div className={styles.right}>
          <AvatarView avatar={avatar} />
        </div>
      </div>
    );
  }
}
