import React from 'react';
import PropTypes from 'prop-types';
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
            onSubmit={this.props.handleSubmit}
          >
            <input
              placeholder="姓名"
              name="name"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              value={this.props.name}
              onChange={this.props.handleChange}
              required
            />
            {/*<input*/}
            {/*placeholder="性别"*/}
            {/*name="gender"*/}
            {/*className={[classes.userInput, classes.mainLoginInput].join(' ')}*/}
            {/*type="text"*/}
            {/*// onChange={this.handleChange}*/}
            {/*value="男"*/}
            {/*required*/}
            {/*/>*/}
            <select 
              className={classes.selectGender} 
              name="gender" 
              value={this.props.gender}
              onChange={this.props.handleChange}>
              <option value={'男'}>男</option>
              <option value={'女'}>女</option>
              <option value={'不方便透露'}>不方便透露</option>
            </select>
            <input
              placeholder="工作状态"
              name="status"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              // onChange={this.handleChange}
              // required
            />
            <input
              placeholder="从事领域"
              name="field"
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              // onChange={this.handleChange}
              // required
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
            <input
              placeholder="电话"
              name='phone_number'
              className={[classes.userInput, classes.mainLoginInput].join(' ')}
              type="text"
              onChange={this.props.handleChange}
              value={this.props.phone_number}
              required
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
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  phone_number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired
};

export const PersonalInfo = withRouter(PersonalInfoReact);
