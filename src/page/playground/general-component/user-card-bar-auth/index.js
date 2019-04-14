import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';
import {getAsync} from '../../../../tool/api-helper';
import classes from './index.module.css';

import * as deviceHelper from '../../../../tool/device-helper';

class UserCardBarAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
    };
    // i18n
    this.text = UserCardBarAuthReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    if (this.props.id) {
      this.setState({
        backend: await getAsync(`/discovery/${this.props.id}`)
      });
    } else {
      this.setState({
        backend: await getAsync('/applicants/2')
      });
    }
  }
  render() {

    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ? (
      <div className={`${classes.content} d-flex align-items-center justify-content-around`}>
        <div>
          <img
            style={deviceHelper.getType() === deviceHelper.MOBILE ? {width: '50px'} : {width: '80px'}}
            src={(this.state.backend.content.avatarUrl)?(this.state.backend.content.avatarUrl):('http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png')}
            className="rounded-circle img-fluid p-0 float-right"
            alt="Sample avatar"
          />
        </div>
        <div>
          <div className={classes.name}>
            {this.state.backend.content.name}
          </div>
          <div className="d-flex">
            <div>
              <p className={classes.education}>
                {this.state.backend.content.education[0].degree},{this.state.mockData.content.education[0].duration[0].end}
              </p>
              <p className={classes.info}>
                {this.state.mockData.content.works[1].duration[0].begin} {this.state.mockData.content.works[1].position}
              </p>
              <p className={classes.info}>
                {this.state.mockData.content.works[0].duration[0].begin} {this.state.mockData.content.works[0].position}
              </p>
            </div>
            <div>
              <p className={classes.education}>
                {this.state.mockData.content.education[0].major} <span className="red-text h6">API没有</span>
              </p>
              <p className={classes.info}>
                {this.state.mockData.content.education[0].university}
              </p>
              <p className={classes.info}>
                {this.state.mockData.content.education[0].organization} <span className="red-text h6">API没有</span>
              </p>
            </div>
          </div>
        </div>
        <div className={classes.btn}>
          <div className={classes.friend}>
            加为好友
          </div>
        </div>
       
      </div>
    ):null;
  }
}

UserCardBarAuthReact.i18n = [
  {},
  {}
];

UserCardBarAuthReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const UserCardBarAuth = withRouter(UserCardBarAuthReact);
