import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import img from './assets/img.png';
import tags from './assets/tags';
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
      modalPrompt: '', //提示信息
      labelDisplay: false,
      selectedTagName: '',
      selectedTagCode: '',
      // ifRedirect: false // 是否重定向
    };
    // i18n
    this.text = RegisterReact.i18n[languageHelper()];
    this.tags = tags;
    this.dic = [];
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

    if (this.comparePassword()) {
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
        localStorage.setItem('id', backend.content.id);
        const loginfo = await postAsync('/login', {
          identifier: this.state.email,
          password: this.state.password
        });

        if (loginfo && loginfo.status && loginfo.status.code === 2000) {
          await postAsync(
            '/labels',
            {label_code: this.state.selectedTagCode, target_id: localStorage.getItem('id'), target_type: 100}
          ).then(() => {
            this.props.history.push('/my');
          });
        }
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

  handleTagChange = value => {
    this.setState({
      selectedTagName: value,
      selectedTagCode: (this.dic.indexOf(value)+1).toString()
    });
  };
  
  componentDidMount() {
    this.tags.content.map(item => {
      this.dic.push(item.name);
    });
  }

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
                selectedTagName={this.state.selectedTagName}
                selectedTagCode={this.state.selectedTagCode}
                confirmPassword={this.state.confirmPassword}
                tags={this.tags}
                handleChange={this.handleChange}
                handleTagChange={this.handleTagChange}
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
