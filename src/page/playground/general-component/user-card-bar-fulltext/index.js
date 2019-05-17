import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import add from './plus.png';

import {languageHelper} from '../../../../tool/language-helper';

import classes from './index.module.css';

import * as deviceHelper from '../../../../tool/device-helper';

class UserCardBarFullReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
     
        
      
    };
    // i18n
    this.text = UserCardBarFullReact.i18n[languageHelper()];
  }
  
  
  render() {

    return (
      <div className={`${classes.content} d-flex align-items-center justify-content-between`}>
        <div>
          <img
            style={deviceHelper.getType() === deviceHelper.MOBILE ? {width: '30px'} : {width: '50px'}}
            src={(this.props.avatar==='---')?('http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'):(this.props.avatar)}
            className="rounded-circle img-fluid p-0 float-right"
            alt="Sample avatar"
          />
        </div>
        <div>
          <div className={classes.name}>
            {this.props.name}
          </div>
          <div className={classes.role}>
            {this.props.role}
          </div>
          <div className={classes.info}>
            {this.props.sex}{', '}{this.props.nation}
          </div>
          
         
        </div>
        <div className={classes.add}>
          <img 
            src={add} 
            alt="no img"
            className="img-fluid p-0 w-100"
          />
        </div>
       
      </div>
    );
  }
}

UserCardBarFullReact.i18n = [
  {},
  {}
];

UserCardBarFullReact.propTypes = {
  // self
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired, 
  nation: PropTypes.string.isRequired,
  role:PropTypes.string.isRequired,
  
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const UserCardBarFull = withRouter(UserCardBarFullReact);
