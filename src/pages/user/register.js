import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import router from 'umi/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress, message } from 'antd';
import styles from './register.less';
import jsencrypt from 'jsencrypt';
import Login from 'components/Login';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="validation.password.strength.strong" />
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="validation.password.strength.medium" />
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="validation.password.strength.short" />
    </div>
  ),
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

@connect(({ register, loading }) => ({
  register,
  submitting: loading.effects['register/submit'],
}))
@Form.create()
class Register extends Component {
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: '',
    prefix: '86',
  };

  componentDidMount() {
    let publickey =
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCqtb8oVssq39Zx3kaaXhBsLspckAqM/4faBaPLkh7kqOzFYsQaXquk2ZZFB8BqfhJpI8SbZDhf7ReRDrSJUGMlQm4FzdqulOowYAb2qPDNSQDZ4OkGbTCwRoYJ8rS433ksM/kA/rNTC+Hnut1vraHVdSLSrTqZjGKBpHSLwh4WTwIDAQAB';
    // publickey = new Buffer(publickey, 'hex');
    // let eb = crypto.publicEncrypt(publickey, 'aaaa');
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publickey);
    var encrypted = encrypt.encrypt('aaa');
    // var decrypted = encrypt.decrypted();
    console.log('publickey:' + publickey);
    console.log(encrypted);
  }

  componentDidUpdate() {
    const { form, register } = this.props;
    const account = form.getFieldValue('mail');
    // if (register.status === 'ok') {
    //   router.push({
    //     pathname: '/user/register-result',
    //     state: {
    //       account,
    //     },
    //   });
    // }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({ type: 'register/getRegisterCaptcha', payload: values.mobile })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({ type: 'register/submit', payload: { ...values, type } });
    }
  };

  //   handleSubmit = e => {
  //     e.preventDefault();
  //     const { form, dispatch } = this.props;
  //     form.validateFields({ force: true }, (err, values) => {
  //       if (!err) {
  //         const { prefix } = this.state;
  //         dispatch({
  //           type: 'register/submit',
  //           payload: {
  //             ...values,
  //             prefix,
  //           },
  //         });
  //       }
  //     });
  //   };

  handleConfirmBlur = e => {
    const { value } = e.target;
    const { confirmDirty } = this.state;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback(formatMessage({ id: 'validation.password.twice' }));
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    const { visible, confirmDirty } = this.state;
    if (!value) {
      this.setState({
        help: formatMessage({ id: 'validation.password.required' }),
        visible: !!value,
      });
      callback('error');
    } else {
      this.setState({
        help: '',
      });
      if (!visible) {
        this.setState({
          visible: !!value,
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {
        const { form } = this.props;
        if (value && confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value,
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;
    const { count, prefix, help, visible } = this.state;
    return (
      <div className={styles.main}>
        <h3>
          <FormattedMessage id="app.register.register" />
        </h3>
        <Login //   defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Mobile name="mobile" placeholder="输入手机号码" />
          <Captcha
            name="captcha"
            countDown={120}
            onGetCaptcha={this.onGetCaptcha}
            placeholder="验证码"
          />
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <FormattedMessage id="app.register.register" />
            </Button>
            <Link className={styles.login} to="/user/login">
              <FormattedMessage id="app.register.sing-in" />
            </Link>
          </FormItem>
        </Login>
      </div>
    );
  }
}

export default Register;
