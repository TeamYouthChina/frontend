import React from 'react';
import PropTypes from 'prop-types';
//import classes from './index.module.css';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {getAsync} from '../../tool/api-helper';
import {NotificationCard} from './Card';

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
    
    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ?(

      <div>
        <div className="d-flex flex-wrap justify-content-between" style={{padding: '1.40vw 0'}}>
          {this.state.backend.content.data.map((item, index) => {
            return (
              <div style={{marginBottom: '1vw'}} key={index}>
                <NotificationCard
                  id={item.notification_id}
                  text={item.text}
                  isread={item.is_read}
                  date={item.create_at}
                />
              </div>
            );
          })}
        </div>
      </div>
      
    ):null;
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
