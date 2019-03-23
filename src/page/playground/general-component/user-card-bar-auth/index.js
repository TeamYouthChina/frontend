import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';
import {mockGetAsync} from '../../../../tool/api-helper';
import {content} from '../company-card-bar-auth/index.mock';
//import classes from './index.module.css';

class UserCardBarAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      mockDate:{
        content:{
          id: null,
          name: null,
          education:[
            {
              university: null,
            }
          ],
          currentCompany:[
            {
              location:null
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
      null
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
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const UserCardBarAuth = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(UserCardBarAuthReact));
