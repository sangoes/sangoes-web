import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ routing }) => ({
  ...routing,
}))
export default class url extends Component {
  render() {
    const {
      location: { query },
    } = this.props;
    return <div>
      <iframe style={{ border: 0, width: '100%', height: '100vh' }} src={query && query.url} />
      </div>;
  }
}
