import React from 'react';
import PropTypes from 'prop-types';

import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import logo from './image.png';
import {languageHelper} from '../../../tool/language-helper';

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
      <div className={classes.content}>
        <div className="d-flex">
          <div className={classes.border}>
            <img src={logo} className="img-fluid"/>
          </div>
          <div className={classes.text}>
            {this.props.text}
          </div>

        </div>
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
  text: PropTypes.string.isRequired,
  date:PropTypes.number.isRequired,
  isread:PropTypes.bool.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const NotificationCard = withRouter(NotificationCardReact);
