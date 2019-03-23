import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';

import {ReviewCardBarId} from '../../../playground/general-component/review-card-bar-id';

import data from '../../data/';
import classes from './answers.module.css';

class AnswersReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null
    };
    // i18n
    this.text = AnswersReact.i18n[languageHelper()];
  }
  
  componentDidMount() {
    if(this.props.match.params.aid === undefined){
      this.setState({
        backend:data.content.answers
      });
    } else {
      this.setState({
        backend:data.content.answers[this.props.match.params.aid]
      });
    }
    
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend !== null) ? (
      <React.Fragment>
        <p className={classes.answerCount}>{this.props.answers.length}条回答</p>
        <ReviewCardBarId id={this.props.answers[0]}/>
        {this.state.backend.length === undefined ? (
          <div>
            <button>更多回答</button>
          </div>
        ) : (
          <div>
            <p className={classes.moreAnswer}>更多回答</p>
            {this.state.backend.map((answer, index)=>{
              return(
                index > 0 ? (<ReviewCardBarId id={answer.id} key={answer.id}/>) : null
              );
            })}
          </div>
          
        )}
      </React.Fragment>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

AnswersReact.i18n = [
  {},
  {}
];

AnswersReact.propTypes = {
  // self
  answers:PropTypes.array.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

const Answers = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(AnswersReact));

export default Answers;
