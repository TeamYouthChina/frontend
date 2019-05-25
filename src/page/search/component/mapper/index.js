import React from 'react';
import Proptypes from 'prop-types';
import {MDBCol, MDBRow} from 'mdbreact';
import classes from '../../container/insight/index.module.css';
import {ArticleCardBarId} from '../../../../general-component/article-card-bar-id';
import {AnswerCardBarId} from '../../../../general-component/answer-card-bar-id';
import {ReviewCardBarId} from '../../../../general-component/review-card-bar-id';
import {JobCardBarId} from '../../../playground/general-component/job-card-bar-id';
import {CompanyCardBarId} from '../../../playground/general-component/company-card-bar-id';
import {UserCardBarAuth} from '../../../playground/general-component/user-card-bar-long-fulltext';

export class CardMapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      (this.props.backend.map((item, index) => (
        <MDBRow className={classes.cardBarRow} key={index}>
          <MDBCol>
            {(() => {
              switch (item.type) {
                case 'article':
                  return <ArticleCardBarId id={item.content.id} />;
                case 'question':
                  return <AnswerCardBarId
                    questionId={item.content.id}
                    questionTitle={item.content.title}
                    id={item.content.answers[0].id} />;
                case 'editorial':
                  return <ReviewCardBarId id={item.content.id} />;
                case 'job':
                  return <JobCardBarId id={item.content.id} />;
                case 'company':
                  return <CompanyCardBarId id={item.content.id} />;
                case 'user':
                  return <UserCardBarAuth id={item.id} />;
              }
            })()}
          </MDBCol>
        </MDBRow>)))
    );
  }
}

CardMapper.propTypes = {
  backend: Proptypes.array.isRequired,
};
