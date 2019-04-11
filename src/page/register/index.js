import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import img from './assets/img.png';
import classes from './index.module.css';
import {PersonalInfo} from './personalInfo';
import {BasicInfo} from './basicInfo';
import {RegisterFailPrompt} from './register-fail';
import {languageHelper} from '../../tool/language-helper';
import {postAsync} from '../../tool/api-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

class RegisterReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      passwordInputType: 'password',
      registerType: 'personal', //记录个人登陆还是企业登陆
      showDetail: false, //是否显示用户详细信息填写
      //用户信息
      name: '',
      password: '',
      phone_number: '',
      email: '',
      nation: '',
      gender: '男',
      age: '',
      //以上为用户信息
      modalDisplay: false
      // ifRedirect: false // 是否重定向
    };
    // i18n
    this.text = RegisterReact.i18n[languageHelper()];
  }

  // handleRegisterType = (event) => {
  //   this.setState({
  //     registerType: event.target.value === 'personal' ? 'personal' : 'company'
  //   });
  // };

  handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const backend = await postAsync('/applicants/register', {
      //some user info are temporally fixed
      username: this.state.name,
      date_of_birth: '1994-04-18',
      password: this.state.password,
      phone_number: this.state.phone_number,
      email: this.state.email,
      nation: 'China',
      gender: this.state.gender,
      age: this.state.age
    });

    if (backend && backend.status && backend.status.code === 2000) {
      this.props.history.push('/login');
      //if register success, set ifRedirect value to be true and re-render the page.
      // this.setState({ifRedirect: true});
    } else {
      this.setState({
        modalDisplay: true
      });
    }
  };

  toggleModal = () => {
    this.setState({
      modalDisplay: !this.state.modalDisplay,
      //重置所有以前输入的信息
      showDetail: false,
      name: '',
      phone_number: '',
      email: ''
    });
  };

  handleShowDetail = () => {
    this.setState({showDetail: true});
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
              <RegisterFailPrompt isOpen={this.state.modalDisplay} toggle={this.toggleModal} />
            </div>

            <div className={classes.rightCol}>
              {this.state.showDetail ?
                <PersonalInfo
                  name={this.state.name}
                  password={this.state.password}
                  email={this.state.email}
                  handleSubmit={this.handleRegisterSubmit}
                  handleChange={this.handleChange} /> :
                <BasicInfo
                  name={this.state.name}
                  email={this.state.email}
                  phone_number={this.state.phone_number}
                  age={this.state.age}
                  gender={this.state.gender}
                  handleShowDetail={this.handleShowDetail}
                  handleChange={this.handleChange} />}
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

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Register = RegisterReact;
