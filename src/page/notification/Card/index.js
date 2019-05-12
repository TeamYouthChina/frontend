import React from 'react';
import PropTypes from 'prop-types';
//import classes from './index.module.css';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';

export class NotificationCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = NotificationCardReact.i18n[languageHelper()];
  }

  render() {
    return (

      <div className="d-flex">
        

      </div>
      
    );
  }
}

NotificationCardReact.i18n = [
  {},
  {}
];

NotificationCardReact.propTypes = {
  id:PropTypes.number.isRequired,
  text: PropTypes.String.isRequired,
  date:PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const NotificationCard = withRouter(NotificationCardReact);
