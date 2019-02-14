import React, { Component } from 'react';
import styles from './index.less';
import BaseLayout from '@/components/BaseLayout';
import { Row, Col, Card, Divider } from 'antd';
import { connect } from 'dva';

/**
 * 个人中心
 */
@connect(({ app, loading }) => ({ ...app, userInfoLoading: loading.effects['app/getUserInfo'] }))
export default class CenterPage extends Component {
  operationTabList = [
    {
      key: 'articles',
      tab: (
        <span>
          文章 <span style={{ fontSize: 14 }}>(8)</span>
        </span>
      ),
    },
    {
      key: 'applications',
      tab: (
        <span>
          应用 <span style={{ fontSize: 14 }}>(8)</span>
        </span>
      ),
    },
    {
      key: 'projects',
      tab: (
        <span>
          项目 <span style={{ fontSize: 14 }}>(8)</span>
        </span>
      ),
    },
  ];
  // 个人中心选项选中
  _onTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        break;
      case 'applications':
        break;
      case 'projects':
        // router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };
  render() {
    const { userInfo, children, match, location, userInfoLoading } = this.props;
    return (
      <div className={styles.content}>
        <Row gutter={24}>
          {/* 侧边栏个人中心 */}
          <Col lg={7} md={24}>
            <Card bordered={false} loading={userInfoLoading}>
              {userInfo && Object.keys(userInfo).length ? (
                <div>
                  <div className={styles.avatarHeader}>
                    {/* 头像 */}
                    <img alt="" src={userInfo.avatar} />
                    {/* 姓名 */}
                    <div className={styles.realName}>{userInfo.realName}</div>
                    {/* 签名 */}
                    <div>{userInfo.signature}</div>
                  </div>
                  <div className={styles.detail}>
                    <p>
                      {/* <i className={styles.address} /> */}
                      {/* {userInfo.geographic.province.label}
                      {userInfo.geographic.city.label} */}
                    </p>
                  </div>
                  <Divider dashed />
                </div>
              ) : (
                'loading...'
              )}
            </Card>
          </Col>
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={this.operationTabList}
              onTabChange={this._onTabChange}
            >
              正在开发....
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
