import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import {IfCollect} from '../../playground/general-component/if-collect';
import {languageHelper} from '../../../tool/language-helper';

class KnowCompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = KnowCompanyReact.i18n[languageHelper()];
    // style
  }

  render() {
    return (
      <div>
        <div className={classes.content}>
          <div className="d-flex justify-content-between">
            <div className={classes.name}>了解公司</div>
            <div>
              <IfCollect
                id={this.props.backend.content.organization.id}
                type={2}
                ifcollect={this.props.backend.content.organization.collected}
              />
            </div>
          </div>
          <div className="d-flex align-items-end">
            <div>
              <img
                src={(this.props.backend.content.organization.avatarUrl)?(this.props.backend.content.organization.avatarUrl):('https://frontendpic.oss-us-east-1.aliyuncs.com/%E5%85%AC%E5%8F%B8.png')}
                alt="no img"
                className="img-fluid p-0 float-right"
                style={{width:'3.9vw'}}
              />
            </div>
            <div className={classes.company}>{this.props.backend.content.organization.name}</div>
          </div>
          <div className={classes.note}><pre>{this.props.backend.content.organization.note}</pre></div>
        </div>
        
      </div>
    );
  }
}

KnowCompanyReact.i18n = [
  {},
  {}
];

KnowCompanyReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const KnowCompany = withRouter(KnowCompanyReact);
