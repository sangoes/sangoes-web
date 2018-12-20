import React, { Component } from 'react';
import { connect } from 'dva';
import { PageHeader } from 'ant-design-pro';
import router from 'umi/router';

@connect(({ routing }) => ({
  ...routing,
}))
export default class url extends Component {
  render() {
    const {
      location: {
        query: { item },
      },
    } = this.props;
    // 判断url是否为空
    if (!item || !item.url) {
      router.push('/exception/404');
    }
    return (
      <div>
        <PageHeader title={item && item.name} />
        <iframe style={{ border: 0, width: '100%', height: '100vh' }} src={item && item.url} />
      </div>
    );
  }
}
