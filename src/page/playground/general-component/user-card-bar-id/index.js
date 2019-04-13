import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import add from './plus.png';
import {content} from './index.mock';
import {languageHelper} from '../../../../tool/language-helper';
import {mockGetAsync} from '../../../../tool/api-helper';
import classes from './index.module.css';

import * as deviceHelper from '../../../../tool/device-helper';

class UserCardBarIdReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      mockData:{
        content :{
          id: null,
          name: null,
          university:null,
          position:null,
          education:[
            {
              university: null,
              degree:null,
              duration:[{
                end:null
              }],
              major:null
            }
          ],
          works:[
            {
              id:null,
              name:null,
              duration:[{
                begin:null
              }],
              position:null,
            },
            {
              id:null,
              name:null,
              duration:[{
                begin:null
              }],
              position:null,
            }
          ]
        },
        status: {
          code: null,
          reason: null,
        },
      },
    };
    // i18n
    this.text = UserCardBarIdReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    // const requestedData = await getAsync();
    // this.setState({ cardData: requestedData, ...this.state });

    const requestedData = await mockGetAsync(content);
    this.setState({ ...this.state, mockData: requestedData});
  }
  render() {

    return (
      <div className={`${classes.content} d-flex align-items-center justify-content-around`}>
        <div>
          <img
            style={deviceHelper.getType() === deviceHelper.MOBILE ? {width: '50px'} : {width: '80px'}}
            src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
            // src="https://s2.ax1x.com/2019/01/27/kuUMYq.jpg"
            className="rounded-circle img-fluid p-0 float-right"
            alt="Sample avatar"
          />
        </div>
        <div>
          <div className={classes.name}>
            {this.state.mockData.content.name}
          </div>
          <div className={classes.role}>
            {this.state.mockData.content.works[0].position}
          </div>
          <div className={classes.info}>
            {this.state.mockData.content.education[0].major}
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

UserCardBarIdReact.i18n = [
  {},
  {}
];

UserCardBarIdReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const UserCardBarId = withRouter(UserCardBarIdReact);
