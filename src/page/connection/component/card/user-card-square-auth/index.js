import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../../tool/language-helper';
import classes from './index.module.css';

import * as deviceHelper from '../../../../../tool/device-helper';

class UserCardSquareAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
    };
    // i18n
    this.text = UserCardSquareAuthReact.i18n[languageHelper()];
  }
  

  render() {

    return (
      <div className={`${classes.content} d-flex align-items-center justify-content-around`}>
        <div>
          <img
            style={deviceHelper.getType() === deviceHelper.MOBILE ? {width: '30px'} : {width: '50px'}}
            src={(!this.props.avatar||this.props.avatar==='---')?('http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'):(this.props.avatar)}
            className="rounded-circle img-fluid p-0 float-right"
            alt="Sample avatar"
          />
        </div>
        <div>
          <div className={classes.name}>{this.props.name}</div>
          <div className={classes.position}>{this.props.role}</div>
          <div className={classes.university}>{this.props.sex}{'，'}{this.props.nation}</div>
        </div>
        <div className={classes.btn}>
          <div className={classes.friend}>
            加为好友
          </div>
        </div>
      </div>
    );
  }
}

UserCardSquareAuthReact.i18n = [
  {},
  {}
];

UserCardSquareAuthReact.propTypes = {
  // self
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  nation: PropTypes.string.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const UserCardSquareAuth = withRouter(UserCardSquareAuthReact);
