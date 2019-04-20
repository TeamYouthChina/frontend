import React from 'react';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import {MDBCol} from 'mdbreact';

import img from './assets/img.png';
import facebook from './assets/facebook.svg';
import google from './assets/google.svg';
import instgram from './assets/ins.svg';
import linkedin from './assets/linkedin.svg';
import classes from './index.module.css';
import Cookies from 'js-cookie';
import queryString from 'query-string';
import {LoginFailPrompt} from './login-fail';
import {isLogin, postAsync} from '../../tool/api-helper';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

class LoginReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      type: 'password',
      id: '',
      password: '',
      modalDisplay: false
    };
    // i18n
    this.text = LoginReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    //if token exist, set ifRedirect value to be true and re-render the page.
    if (Cookies.get('token')) {
      this.setState({
        ifRedirect: true
      });
    }
  }

  toggleModal = () => {
    this.setState({
      modalDisplay: !this.state.modalDisplay
    });
  };

  showHidePasswd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      type: this.state.type === 'text' ? 'password' : 'text'
    });
  };

  handleChange = async (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLoginSubmit = async (event) => {
    event.preventDefault();

    const backend = await postAsync('/login', {
      id: this.state.id,
      password: this.state.password
    });
    // must clean token, valid token will always cause 200 OK return.
    // Cookies.remove('token');
    if (backend && backend.status && backend.status.code === 2000) {
      localStorage.setItem('id', backend.content.id);
      localStorage.setItem('username', backend.content.username);
      localStorage.setItem('avatar', backend.content.avatarUrl ? backend.content.avatarUrl : 'https://s2.ax1x.com/2019/01/27/kuUMYq.jpg', {expires: 1});
      const to = queryString.parse(this.props.location.search).to;
      this.props.history.push(to ? to : '/');
      if (to) {
        this.props.history.push(to);
      } else {
        this.props.history.push(this.props.to);
      }
    } else {
      // login fail
      this.setState({
        modalDisplay: !this.state.modalDisplay
      });
    }
  };

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    if (isLogin()) {
      const to = queryString.parse(this.props.location.search).to;
      if (to) {
        return (<Redirect to={to} />);
      } else {
        return (<Redirect to={this.props.to} />);
      }
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
              <LoginFailPrompt isOpen={this.state.modalDisplay} toggle={this.toggleModal} />
            </div>

            <div className={classes.rightCol}>
              <div>
                <MDBCol className="offset-2" size="8">
                  <div className="text-center">
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
                      value={this.state.id}
                    />
                    <div style={{position: 'relative'}}>
                      <input
                        placeholder="密码"
                        name='password'
                        className={[classes.userInput, classes.mainLoginInput].join(' ')}
                        type={this.state.type}
                        onChange={this.handleChange}
                        required
                        value={this.state.password}
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
                    <Link to="/register" className="blue-text ml-1">
                      注册
                    </Link>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <a
                      type="button"
                      href="https://www.facebook.com"
                      className={classes.outterLoginIcon}
                    >
                      <img src={facebook} alt="cpnIcon" />
                    </a>
                    <a
                      type="button"
                      href="https://twitter.com"
                      className={classes.outterLoginIcon}
                    >
                      <img src={google} alt="cpnIcon" />
                    </a>
                    <a
                      type="button"
                      href="https://www.google.com"
                      className={classes.outterLoginIcon}
                    >
                      <img src={instgram} alt="cpnIcon" />
                    </a>
                    <a
                      type="button"
                      href="https://www.google.com"
                      className={classes.outterLoginIcon}
                    >
                      <img src={linkedin} alt="cpnIcon" />
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
  to: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Login = LoginReact;
