import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../../tool/language-helper';


class Header2React extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = Header2React.i18n[languageHelper()];
  }

  render() {
    return (
      <div>
        <div
          className={`cell-wall ${classes.background}`}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.content}>
              <div 
                className={classes.interval}
                style={this.props.location.pathname.indexOf('/') > -1 ? {borderBottom: '4px solid #4F65E1',color:'#4F65E1'} : null}
              >
                校园招聘
              </div>
              <div className={classes.interval}>
                社会招聘
              </div>
              <div className={classes.interval}>
                实习
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header2React.i18n = [
  {},
  {}
];

Header2React.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Header2 = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(Header2React));
