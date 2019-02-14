import React from 'react';
import styles from './index.less';
import { Spin } from 'antd';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export default () => (
  <div className={styles.loading}>
    <Spin size="large" />
  </div>
);
