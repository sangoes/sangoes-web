import React, { Component, Fragment } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import authUtils from '@/utils/authUtils';

@connect(({ msg }) => ({ ...msg }))
export default class IndexPage extends Component {
  render() {
    const { wsMsg } = this.props;
    const dd = authUtils.auth('admin:user:addddd');

    return (
      <div className={styles.normal}>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>
            To get started, edit <code>src/pages/index.js</code> and save to reload.
          </li>
          <li>
            <a href="https://umijs.org/guide/getting-started.html">Getting Started</a>
          </li>
        </ul>
        <a onClick={() => wsMsg.send('ckientrwgrer')}>发送消息</a>
      </div>
    );
  }
}
