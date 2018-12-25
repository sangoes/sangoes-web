import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { PageHeader } from 'ant-design-pro';
import styles from './index.less';

const { Content } = Layout;
/**
 * 基础布局
 */
export default class BaseLayout extends PureComponent {
  static propTypes = { title: PropTypes.string };

  render() {
    const { title, children } = this.props;
    return (
      <Layout>
        <PageHeader title={title} />
        <Content className={styles.content}>
          <Layout className={styles.layout}>{children}</Layout>
        </Content>
      </Layout>
    );
  }
}
