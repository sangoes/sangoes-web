import React, { Component } from 'react';
import styles from './index.less';
import { Drawer } from 'antd';
import uuid from 'uuid/v1';

/**
 * @description 日志管理查看
 * @author jerrychir
 * @export
 * @class CheckLogPage
 * @extends {Component}
 */
export default class CheckLogPage extends Component {
  render() {
    const { visible, onClose, item } = this.props;
    const data = [
      { title: '方法名', content: item.title },
      { title: '请求URI', content: item.uri },
      { title: '请求URL', content: item.url },
      { title: '请求IP', content: item.remote },
      { title: '请求方法', content: item.method },
      { title: '请求参数', content: item.params },
      { title: '请求耗时', content: item.elapsed },
      { title: 'Token', content: item.authToken },
      { title: '状态', content: item.status },
      { title: '用户', content: item.creator },
      { title: '用户主键', content: item.creatorId },
    ];
    const dataItem = [];
    data.forEach(item => {
      dataItem.push(<DescriptionItem key={uuid()} title={item.title} content={item.content} />);
    });

    return (
      <div>
        <Drawer width={640} placement="right" closable={false} onClose={onClose} visible={visible}>
          {/* 标题 */}
          <p className={styles.title}>{item.title}</p>
          {/* 详细 */}
          {dataItem}
        </Drawer>
      </div>
    );
  }
}

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);
