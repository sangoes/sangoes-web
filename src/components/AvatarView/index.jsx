import React, { Component, Fragment } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import { Upload, Button } from 'antd';

/**
 * 上传头像组建
 */
export default class AvatarView extends Component {
  render() {
    const { avatar } = this.props;
    return (
      <Fragment>
        <div className={styles.avatar_title}>头像</div>
        <div className={styles.avatar}>
          <img src={avatar} alt="avatar" />
        </div>
        <Upload fileList={[]}>
          <div className={styles.button_view}>
            <Button icon="upload">上传头像</Button>
          </div>
        </Upload>
      </Fragment>
    );
  }
}
AvatarView.propTypes = {
  avatar: PropTypes.string,
};
AvatarView.defaultProps = {
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
};
