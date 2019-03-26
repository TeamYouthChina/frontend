import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {MDBCol} from 'mdbreact';
import classes from './index.module.css';
import arrow from './assets/arrow-forward.svg';
import {languageHelper} from '../../tool/language-helper';

class BasicInfoReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      passwordInputType: 'password',
      registerType: 'personal', //记录个人登陆还是企业登陆
    };
    // i18n
    this.text = BasicInfoReact.i18n[languageHelper()];
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
          <div
            className="text-center"
            // onSubmit={this.handleLoginSubmit}
          >
            <input
              placeholder="姓名"
              name="name"
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
            />
            <div style={{position: 'relative'}}>
              <input
                placeholder="密码"
                name="password"
                className={[classes.userInput, classes.mainLoginInput].join(' ')}
                type={this.state.type}
                // onChange={this.handleChange}
                required
              />
              <input
                placeholder="重复密码"
                // name='password'
                className={[classes.userInput, classes.mainLoginInput].join(' ')}
                type={this.state.type}
                // onChange={this.handleChange}
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
                //eslint-disable-next-line
                onClick={this.props.handleShowDetail}
                className={classes.submitButtonRounded}
                type="submit">
                完善个人信息 <img src={arrow} />
              </button>
            </div>
          </div>
        </MDBCol>
      </div>
    );
  }
}

BasicInfoReact.i18n = [
  {},
  {}
];

BasicInfoReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const BasicInfo = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(BasicInfoReact));
