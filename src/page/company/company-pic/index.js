import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {LightBox} from './picture/picture';
import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';

class CompanyPicReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CompanyPicReact.i18n[languageHelper()];
    // style
  }
 
  render() {
   
    return (
      <div className={classes.content}>
        <p className={classes.name}>图片<span className="h2 red-text">Api没有！！</span></p>
        <div className="d-flex w-100 justify-content-center">
          <LightBox/>
        </div>
        

      </div>
    );
  }
}

CompanyPicReact.i18n = [
  {},
  {}
];

CompanyPicReact.propTypes = {
  // self
  align: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  intervalVw: PropTypes.number.isRequired,
  itemList: PropTypes.array.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const CompanyPic = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(CompanyPicReact));
