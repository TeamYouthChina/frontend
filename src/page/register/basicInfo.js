import React from 'react';
import PropTypes from 'prop-types';
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
      passwordInputType: 'password'
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
              onChange={this.props.handleChange}
              value={this.props.name}
              required
            />
            <input
              placeholder="邮箱"
              name="email"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              onChange={this.props.handleChange}
              value={this.props.email}
              required
            />
            <div style={{position: 'relative'}}>
              <input
                placeholder="密码"
                name="password"
                className={[classes.userInput, classes.mainLoginInput].join(' ')}
                type={this.state.passwordInputType}
                onChange={this.props.handleChange}
                value={this.props.password}
                required
              />
              <input
                placeholder="重复密码"
                name='confirmPassword'
                className={[classes.userInput, classes.mainLoginInput].join(' ')}
                type={this.state.passwordInputType}
                onChange={this.props.handleChange}
                value={this.props.confirmPassword}
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
                完善个人信息 <img src={arrow} alt="arrow"/>
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
  handleChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export const BasicInfo = withRouter(BasicInfoReact);
