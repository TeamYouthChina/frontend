import React from 'react';
import PropTypes from 'prop-types';
//import classes from './index.module.css';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {getAsync} from '../../tool/api-helper';

export class NotificationReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = NotificationReact.i18n[languageHelper()];
  }
  async componentDidMount() {

    this.setState({
      backend: await getAsync(`/notifications/${localStorage.getItem('id')}`)
    });

  }

  render() {
    return (

      <div>

      </div>
      
    );
  }
}

NotificationReact.i18n = [
  {},
  {}
];

NotificationReact.propTypes = {
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Notification = withRouter(NotificationReact);
