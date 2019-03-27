import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import classes from './index.module.css';

import {languageHelper} from '../../../../tool/language-helper';



class ApplicationCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    
    // i18n
    this.text = ApplicationCardReact.i18n[languageHelper()];
  }
  applicationStatus(param) {
    switch (param) {
      case '已查阅': 
        return `${classes.reviewed}`;
      case '已面试':
        return `${classes.interviewed}`;
      case '待审阅':
        return `${classes.pendingReview}`;
      case '未通过': 
        return `${classes.nopass}`;
      case '已通过':
        return `${classes.pass}`;
    }
  }



  render() {

    return(
      <div style={{marginBottom:'8vw',background:'#FFFFFF',padding:'0.72vw 0'}}>
        <p className={classes.api}>整个API 都！没！有！</p>
        {this.props.applicationList.map((item, index) => {
          return (
            <div className={classes.content} key={index}>
              <div className={classes.job}>
                {item.job}
              </div>
              <div className={classes.company}>
                {item.company}
              </div>
              <div className={classes.location}>
                {item.location}
              </div>
              <div className={classes.date}>
                {item.date}
              </div>
              <div className={this.applicationStatus(item.status)}>
                {item.status}
              </div>

            </div>
          );
        })}

      </div>
    );
     

  }


}

ApplicationCardReact.i18n = [
  {},
  {}

];

ApplicationCardReact.propTypes = {
  // self

  // React Router
  applicationList:PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,

  // React Redux

};

export const ApplicationCard = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(ApplicationCardReact);
