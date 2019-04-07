import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {MDBCol} from 'mdbreact';

import img from './assets/img.png';
import facebook from './assets/facebook.svg';
import google from './assets/google.svg';
import instgram from './assets/ins.svg';
import linkedin from './assets/linkedin.svg';
import classes from './index.module.css';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

class LoginReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      type: 'password',
      loginType: 'personal', //记录个人登陆还是企业登陆
    };
    // i18n
    this.text = LoginReact.i18n[languageHelper()];
  }

  handleLoginType = (event) => {
    this.setState({
      loginType: event.target.value === 'personal' ? 'personal' : 'company'
    });
  };

  showHidePasswd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      type: this.state.type === 'text' ? 'password' : 'text'
    });
  };

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane d-flex"
          >

            <div className={classes.leftCol}>
              <img className="img-fluid" src={img} alt="view" />
            </div>

            <div className={classes.rightCol}>
              <div>
                <MDBCol className="offset-2" size="8">
                  <div className="text-center">
                    <div className="d-flex align-item-center justify-content-center">
                      <button
                        onClick={this.handleLoginType}
                        value="personal"
                        className={this.state.loginType === 'personal' ? classes.selectedButton : classes.disableButton}>
                        个人登陆
                      </button>
                      <button
                        onClick={this.handleLoginType}
                        value="company"
                        className={this.state.loginType === 'company' ? classes.selectedButton : classes.disableButton}>
                        企业登陆
                      </button>
                    </div>
                    <p className={classes.title}>
                      精准定制的全栈式智慧招聘平台
                    </p>
                    <p className={classes.incTitle}>
                      职道
                    </p>
                  </div>
                  <form
                    className="text-center"
                    onSubmit={this.handleLoginSubmit}
                  >
                    <input
                      placeholder="邮箱"
                      // todo, name=id的原因是后端使用的是id登陆，而不是邮箱。name这个以后要改为email
                      name='id'
                      className={[classes.userInput, classes.mainLoginInput].join(' ')}
                      type="text"
                      onChange={this.handleChange}
                      required
                    />
                    <div style={{position: 'relative'}}>
                      <input
                        placeholder="密码"
                        name='password'
                        className={[classes.userInput, classes.mainLoginInput].join(' ')}
                        type={this.state.type}
                        onChange={this.handleChange}
                        required
                      />
                      {/*显示/隐藏密码*/}
                      {/*<span onClick={this.showHidePasswd} className={classes.eyeIcon}>*/}
                      {/*{*/}
                      {/*this.state.type === 'text' ?*/}
                      {/*<MDBIcon icon="eye" /> :*/}
                      {/*<MDBIcon flip="horizontal" icon="eye-slash" />*/}
                      {/*}*/}
                      {/*</span>*/}
                    </div>
                    <div className="text-center">
                      <button
                        className={classes.submitButton}
                        type="submit">
                        登录
                      </button>
                    </div>
                  </form>
                  <div className={classes.registerProps}>
                    还没有账号?
                    <a href="/register" className="blue-text ml-1">
                      注册
                    </a>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <a
                      type="button"
                      href="https://www.facebook.com"
                      className={classes.outterLoginIcon}
                    >
                      <img src={facebook} alt="cpnIcon"/>
                    </a>
                    <a
                      type="button"
                      href="https://twitter.com"
                      className={classes.outterLoginIcon}
                    >
                      <img src={google} alt="cpnIcon"/>
                    </a>
                    <a
                      type="button"
                      href="https://www.google.com"
                      className={classes.outterLoginIcon}
                    >
                      <img src={instgram} alt="cpnIcon"/>
                    </a>
                    <a
                      type="button"
                      href="https://www.google.com"
                      className={classes.outterLoginIcon}
                    >
                      <img src={linkedin} alt="cpnIcon"/>
                    </a>
                  </div>
                </MDBCol>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

LoginReact.i18n = [
  {},
  {}
];

LoginReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Login = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(LoginReact);
