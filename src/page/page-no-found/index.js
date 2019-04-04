import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import './space.jpg';

class PageNoFoundReact extends React.Component {
  constructor(props) {
    super(props);
    // i18n
    this.text = PageNoFoundReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div 
        className="cell-wall" 
        style={{
          background:'url("https://images2.alphacoders.com/644/644457.jpg") no-repeat',
          height:'62.5vw',
          width:'100%',
          
          backgroundSize:'100% 100%'
        }}
      >
        <div className="cell-membrane">
          <div 
            className="d-flex"
            style={{height:'250px',marginLeft:'100px',marginTop:'100px'}}
          >
            <div>
              <img
                src="https://weareblend.la/wp-content/themes/blend-wp-theme/images/404/astronaut.png"

                className={classes.astronaut}
              />
            </div>
            <div style={{marginLeft:'200px'}} className="justify-content-center">
              <p style={{textAlign:'center'}}className={classes.font404}>404</p>
              <p className={classes.text}>We told you not to stray too far from the ship!</p>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div className={classes.button} style={{marginRight:'60px'}}>返回</div>
            <div className={classes.button}>刷新</div>
          </div>

        </div>
      </div>
    );
  }
}

PageNoFoundReact.i18n = [
  {},
  {}
];

PageNoFoundReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const PageNoFound = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(PageNoFoundReact);
