

import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';




import classes from './index.module.css';

import {languageHelper} from '../../../../tool/language-helper';





class ReviewCardSquareReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
    };
    // i18n
    this.text = ReviewCardSquareReact.i18n[languageHelper()];
  }
  
  render() {



    return (
      <div 
        className={classes.content}
        onClick={()=>{
          this.props.history.push(`/review/${this.props.id}`);
        }}
        style={{cursor:'pointer'}}
      >
        <div className={classes.logo}>“</div>
        <div className={classes.note}>{(this.props.body.length>50)?(this.props.body.substr(0,50)+'...'):(this.props.body)}</div>
        <div className="d-flex align-items-center mt-2">
          <div className={classes.avatar}>
            <img
              src={(this.props.avatar==='---')?('http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'):(this.props.avatar)}
              className="rounded-circle img-fluid p-0 float-right"
            />
          </div>
          <div className={classes.people}>{this.props.username}</div>
          {/*<div className={classes.tag}><div className="px-2">{this.state.backend.content.creator.role}</div>
          </div>*/}
        </div>
      </div>

    );
  }
}

ReviewCardSquareReact.i18n = [
  {},
  {}
];

ReviewCardSquareReact.propTypes = {
  id:PropTypes.number.isRequired,
  body:PropTypes.string.isRequired,
  username:PropTypes.string.isRequired,
  avatar:PropTypes.string.isRequired,
 
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};


export const ReviewCardSquare = withRouter(ReviewCardSquareReact);

