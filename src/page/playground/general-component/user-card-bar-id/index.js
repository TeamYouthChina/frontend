import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import add from './plus.png';

import {languageHelper} from '../../../../tool/language-helper';

import classes from './index.module.css';

import * as deviceHelper from '../../../../tool/device-helper';
import {getAsync} from '../../../../tool/api-helper';

class UserCardBarIdReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
     
        
      
    };
    // i18n
    this.text = UserCardBarIdReact.i18n[languageHelper()];
  }

  async componentDidMount() {

    this.setState({
      backend: await getAsync(`/applicants/${this.props.id}/cards`)
    });
    
  }
  render() {

    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ?(
      <div className={`${classes.content} d-flex align-items-center justify-content-between`}>
        <div>
          <img
            style={deviceHelper.getType() === deviceHelper.MOBILE ? {width: '30px'} : {width: '50px'}}
            src={('http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png')}
            className="rounded-circle img-fluid p-0 float-right"
            alt="Sample avatar"
          />
        </div>
        <div>
          <div className={classes.name}>
            {this.state.backend.content.name}
          </div>
          <div className={classes.role}>
            1
            {this.state.backend.content.position}
            
          </div>
          <div className={classes.info}>
            1
            {this.state.backend.content.company}
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
    ):null;
  }
}

UserCardBarIdReact.i18n = [
  {},
  {}
];

UserCardBarIdReact.propTypes = {
  // self
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired, 
  nation: PropTypes.string.isRequired,
  
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const UserCardBarId = withRouter(UserCardBarIdReact);
