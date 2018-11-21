import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import JSEncrypt from 'jsencrypt';
import { createAction } from '@/utils';
import { randomLetterAndNums } from '@/utils/utils';

const { Tab, UserName, Password, Mobile, Captcha, Submit, CaptchaImage } = Login;

@connect(({ login, app, loading }) => ({
  login,
  ...app,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    imgUrl: '',
    publicRandom: '',
    captchaRandom: '',
  };

  onTabChange = type => {
    this.setState({ type });
    //切换
    type === 'account' && this._handleRandomPublicKey();
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({ type: 'app/getRegisterCaptcha', payload: values.mobile })
            .then(resolve)
            .catch(reject);
        }
      });
    });
  // 登录
  handleSubmit = (err, values) => {
    const { type, publicRandom, captchaRandom } = this.state;
    const { publicKey } = this.props;
    if (!err) {
      // 手机登录
      if (type === 'mobile') {
        this.props.dispatch(
          createAction('login/loginMobile')({
            ...values,
            signinType: '201',
            grant_type: 'password',
          })
        );
      }
      // 账户登录
      if (type === 'account') {
        // 加密
        let crypt = new JSEncrypt();
        crypt.setPublicKey(publicKey);
        const formData = new FormData();
        formData.append('username', values.username);
        formData.append('password', crypt.encrypt(values.password));
        formData.append('signinType', '201');
        formData.append('publicRandom', publicRandom);
        formData.append('captchaRandom', captchaRandom);
        formData.append('captcha', values.captcha);
        formData.append('type', 'account');
        this.props.dispatch(createAction('login/loginAccount')(formData));
      }
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );
  _handleRandomPublicKey() {
    //生成随机数
    const random = randomLetterAndNums();
    this.setState({ publicRandom: random });
    //服务器获取公钥
    this.props.dispatch(createAction('app/getPublicKeyByRandom')(random));
  }
  // 加载完成
  componentDidMount() {
    const random = randomLetterAndNums();
    this.setState({ imgUrl: `/api/captcha/image/${random}`, captchaRandom: random });
    //随机数生成公钥
    this._handleRandomPublicKey();
  }
  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin, imgUrl } = this.state;

    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <UserName name="username" placeholder="用户名" />
            <Password
              name="password"
              placeholder="密码"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
            {/* 验证码 */}
            <CaptchaImage
              name="captcha"
              placeholder="验证码"
              imgUrl={imgUrl}
              onCaptchaPress={() => {
                const random = randomLetterAndNums();
                this.setState({
                  imgUrl: `/api/captcha/image/${random}`,
                  captchaRandom: random,
                });
              }}
            />
          </Tab>
          <Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            {login.status === 'error' &&
              login.type === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'app.login.message-invalid-verification-code' })
              )}
            <Mobile name="mobile" placeholder="输入手机号码" />
            <Captcha
              name="captcha"
              placeholder="验证码"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <div className={styles.other}>
            <FormattedMessage id="app.login.sign-in-with" />
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
