import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {MDBCol} from 'mdbreact';
import classes from './index.module.css';
import {languageHelper} from '../../tool/language-helper';

class PersonalInfoReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      passwordInputType: 'password',
      registerType: 'personal', //记录个人登陆还是企业登陆
    };
    // i18n
    this.text = PersonalInfoReact.i18n[languageHelper()];
  }

  handleRegisterType = (event) => {
    this.setState({
      registerType: event.target.value === 'personal' ? 'personal' : 'company'
    });
  };

  render() {
    return (
      <div>
        <MDBCol className="offset-2" size="8">
          <div className="text-center">
            <div className="d-flex align-item-center justify-content-center">
              <button
                onClick={this.handleRegisterType}
                value="personal"
                className={this.state.registerType === 'personal' ? classes.selectedButton : classes.disableButton}>
                个人注册
              </button>
              <button
                onClick={this.handleRegisterType}
                value="company"
                className={this.state.registerType === 'company' ? classes.selectedButton : classes.disableButton}>
                企业注册
              </button>
            </div>
            <p className={classes.title}>
              开启智能求职之旅
            </p>
            <p className={classes.incTitle}>
              职道
            </p>
          </div>
          <form
            className="text-center"
            // onSubmit={this.handleLoginSubmit}
          >
            <input
              placeholder="姓名"
              name="name"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              value="郭亦豪"
              // onChange={this.handleChange}
              required
            />
            <input
              placeholder="性别"
              name="gender"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              // onChange={this.handleChange}
              required
            />
            <input
              placeholder="工作状态"
              name="status"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              // onChange={this.handleChange}
              required
            />
            <input
              placeholder="从事领域"
              name="field"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              // onChange={this.handleChange}
              required
            />
            <input
              placeholder="邮箱"
              name="email"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              // onChange={this.handleChange}
              required
              value="guoyihao@gmail.com"
            />
            <input
              placeholder="电话"
              name='tel'
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              // onChange={this.handleChange}
              required
              value="139975570965"
            />
            <div className="text-center">
              <button
                className={classes.submitButton}
                type="submit">
                注册完成
              </button>
            </div>
          </form>
        </MDBCol>
      </div>
    );
  }
}

PersonalInfoReact.i18n = [
  {},
  {}
];

PersonalInfoReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const PersonalInfo = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(PersonalInfoReact));
