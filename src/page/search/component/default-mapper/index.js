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
import {getAsync} from '../../../../tool/api-helper';

export class DefaultCardMapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      page: 0
    };
  }

  async componentDidMount() {
    const result = await this.getData(6);
    await this.setState(()=> {
      return {result};
    });
    /*eslint-disable*/
    if(this.props.handleResultNum) {
      await this.props.handleResultNum(result.content.data.length);
    }
    /*eslint-enable*/
  }
  
  render() {
    return (
      (this.state.result && this.state.result.status && this.state.result.status.code ?
        (this.state.result.content.data.map((item, index) => (
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
                    return <JobCardBarId id={item.id} />;
                  case 'company':
                    return <CompanyCardBarId id={item.id} />;
                  case 'user':
                    return <UserCardBarAuth id={item.id} />;
                }
              })()}
            </MDBCol>
          </MDBRow>)))
        : null
      )
    );
  }

  getData = async limit => {
    try {
      const result = await getAsync(`/discovery/${this.props.type}?limit=${limit}&page=${this.state.page}`);
      if (result && result.status) {
        // console.log(result);
        return result;
      } else {
        return null;
      }

    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

}

DefaultCardMapper.propTypes = {
  type: Proptypes.string.isRequired,
};
