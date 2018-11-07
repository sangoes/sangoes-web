import React, { Component } from 'react';
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
import { PageHeader, StandardTable } from 'ant-design-pro';
import styles from './index.less';
/**
 * 用户管理
 */
@Form.create()
export default class UserMgtPage extends Component {
  render() {
    return (
      <div>
        <PageHeader title="用户管理" />
        <Card bordered={false} />
      </div>
    );
  }
}
