import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';
import classes from './index.module.css';
import {mockGetAsync} from '../../../../tool/api-helper';
import {content} from '../company-card-bar-auth/index.mock';
import {getType} from '../../../../tool/device-helper';

class UserCardSquareAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      mockData:{
        content:{
          id: null,
          name: null,
          university:null,
          position:null,
          education:[
            {
              university: null,
            }
          ],
          works:[
            {
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
    this.text = UserCardSquareAuthReact.i18n[languageHelper()];
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
            style={getType(this.props.bodyClientWidth) === 1 ? {width: '50px'} : {width: '70px'}}
            src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/7/7e/Pikachu_%28Dizzy%29.png/revision/latest?cb=20170410223549"
            // src="https://s2.ax1x.com/2019/01/27/kuUMYq.jpg"
            className="rounded-circle z-depth-1-half img-fluid p-0 float-right"
            alt="Sample avatar"
          />
        </div>
        <div>
          <div className={classes.name}>1{this.state.mockData.content.name}</div>
          <div className={classes.position}>2{this.state.mockData.content.position}</div>
          <div className={classes.university}>3{this.state.mockData.content.university}</div>
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
  id: PropTypes.string.isRequired,
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const UserCardSquareAuth = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(UserCardSquareAuthReact));
