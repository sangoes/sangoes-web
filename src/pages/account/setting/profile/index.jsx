import React, { Component } from 'react';
import { Form } from 'antd';

/**
 * 基础设置/个人设置
 */
export default class ProfileSettingPage extends Component {
  render() {
    return (
      <div>
        <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
          geren
        </Form>
      </div>
    );
  }
}
