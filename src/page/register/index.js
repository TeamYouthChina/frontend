import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import img from './assets/img.png';
import classes from './index.module.css';
import {BasicInfo} from './basicInfo';
import {RegisterFailPrompt} from './register-fail';
import {languageHelper} from '../../tool/language-helper';
import {isLogin, postAsync} from '../../tool/api-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import queryString from 'query-string';

class RegisterReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      passwordInputType: 'password',
      // showDetail: false, //是否显示用户详细信息填写
      //用户信息
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: '',
      gender: 'MALE',
      dateOfBirth: 766627200,
      //以上为用户信息
      modalDisplay: false,
      modalPrompt: '' //提示信息
      // ifRedirect: false // 是否重定向
    };
    // i18n
    this.text = RegisterReact.i18n[languageHelper()];
  }

  handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const {
      email,
      password,
      firstName,
      lastName,
      gender,
      dateOfBirth
    } = this.state;
    
    if(this.comparePassword()) {
      const backend = await postAsync('/applicants/register', {
        //some user info are temporally fixed
        email,
        password,
        firstName,
        lastName,
        gender,
        dateOfBirth
      });

      if (backend && backend.status && backend.status.code === 2000) {
        this.props.history.push('/login');
        //if register success, set ifRedirect value to be true and re-render the page.
        // this.setState({ifRedirect: true});
      } else {
        this.setState({
          modalDisplay: true,
          modalPrompt: '用户已存在，请重新输入。'
        });
      }
    } else {
      this.setState({
        modalDisplay: true,
        modalPrompt: '密码输入不一致，请重新输入。'
      });
    }
    
  };

  comparePassword = () => {
    const {password, confirmPassword} = this.state;
    return password === confirmPassword;
  };
  
  toggleModal = () => {
    this.setState({
      modalDisplay: !this.state.modalDisplay,
      //重置所有以前输入的信息
      password: '',
      confirmPassword: '',
      // email: ''
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
            {/*{this.state.ifRedirect ?*/}
            {/*<Redirect to="/login"/> : null*/}
            {/*}*/}
            <div className={classes.leftCol}>
              <img className="img-fluid" src={img} alt="view" />
            </div>

            <div className={classes.rightCol}>
              <BasicInfo
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                age={this.state.age}
                gender={this.state.gender}
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                handleChange={this.handleChange}
                handleSubmit={this.handleRegisterSubmit}
              />
              <RegisterFailPrompt
                isOpen={this.state.modalDisplay}
                toggle={this.toggleModal}
                prompt={this.state.modalPrompt} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RegisterReact.i18n = [
  {},
  {}
];

RegisterReact.propTypes = {
  // self
  to: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Register = RegisterReact;
