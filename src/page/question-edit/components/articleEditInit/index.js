import React from 'react';
import PropTypes from 'prop-types';
import {
  MDBRow,
} from 'mdbreact';
import AnswerTextForArticle from '../answerTextForArticle';
import classes from './articleEditInit.module.css';

class ArticleEditInit extends React.Component {
  render() {
    return (
      <div className={classes.articleWrapper}>
        <MDBRow className={classes.mdbRowWrapper}>
          <AnswerTextForArticle data={this.props.inputData} />
        </MDBRow>
      </div>
    );
  }
}


ArticleEditInit.propTypes = {
  inputData: PropTypes.string.isRequired,
};

export default ArticleEditInit;
