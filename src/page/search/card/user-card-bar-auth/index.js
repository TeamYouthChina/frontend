import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {content} from './index.mock';
import {languageHelper} from '../../../../tool/language-helper';
import {mockGetAsync} from '../../../../tool/api-helper';
import classes from './index.module.css';

import * as deviceHelper from '../../../../tool/device-helper';

class UserCardBarAuthReact extends React.Component {
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
    this.text = UserCardBarAuthReact.i18n[languageHelper()];
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
            src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7e/Pikachu_%28Dizzy%29.png/revision/latest?cb=20170410223549"
            // src="https://s2.ax1x.com/2019/01/27/kuUMYq.jpg"
            className="rounded-circle img-fluid p-0 float-right"
            alt="Sample avatar"
          />
        </div>
        <div>
          <div className={classes.name}>
            {this.state.mockData.content.name}
          </div>
          <div className="d-flex">
            <div>
              <p className={classes.education}>
                {this.state.mockData.content.education[0].degree},{this.state.mockData.content.education[0].duration[0].end}
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
    );
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
