import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {MDBCol} from 'mdbreact';
import {Select} from 'antd';
import classes from './index.module.css';
import {languageHelper} from '../../tool/language-helper';

class BasicInfoReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      passwordInputType: 'password',
      selectedTag: ''
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
            <img
              className={classes.imgLogo}
              src="https://weyouth-frontend.oss-us-east-1.aliyuncs.com/234743988c2c0576fe7129e989f68cac.png"
              alt="logo" />
            <p className={classes.title}>
              开启智能求职之旅
            </p>
          </div>
          <form
            className="text-center"
            onSubmit={this.props.handleSubmit}
          >
            <input
              placeholder="姓"
              name="lastName"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              onChange={this.props.handleChange}
              value={this.props.lastName}
              required
            />
            <input
              placeholder="名"
              name="firstName"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              onChange={this.props.handleChange}
              value={this.props.firstName}
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
              <Select
                className={classes.mainLoginInput}
                style={{width: '25.16vw', margin: '0.4vw 0'}}
                placeholder='求职意向'
                // value={this.props.selectedTagName}
                onChange={this.props.handleTagChange}
              >
                {
                  this.props.tags.content.map((item) => {
                    return (
                      <Select.Option key={item.name}>{item.name}</Select.Option>
                    );
                  })
                }
              </Select>
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
                // onClick={this.props.handleShowDetail}
                className={classes.submitButtonRounded}
                type="submit">
                注册
                {/*<img src={arrow} alt="arrow"/>*/}
              </button>
            </div>
          </form>
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
  tags: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleTagChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  selectedTagName: PropTypes.string.isRequired
};

export const BasicInfo = withRouter(BasicInfoReact);
