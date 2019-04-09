import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import img from './assets/img.png';
import classes from './index.module.css';
import {PersonalInfo} from './personalInfo';
import {BasicInfo} from './basicInfo';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

class RegisterReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      passwordInputType: 'password',
      registerType: 'personal', //记录个人登陆还是企业登陆
      showDetail: false
    };
    // i18n
    this.text = RegisterReact.i18n[languageHelper()];
  }

  // handleRegisterType = (event) => {
  //   this.setState({
  //     registerType: event.target.value === 'personal' ? 'personal' : 'company'
  //   });
  // };

  handleShowDetail = () => {
    this.setState({showDetail: true});
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
              {this.state.showDetail ? <PersonalInfo /> : <BasicInfo handleShowDetail={this.handleShowDetail} />}
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
