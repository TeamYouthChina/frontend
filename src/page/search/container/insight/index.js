import React from 'react';
import {
  MDBBtn,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow
} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import wrtiteArticle from '../../assets/writeArticle.svg';
import writeQuestion from '../../assets/writeQuestion.svg';
import writeReview from '../../assets/writeReview.svg';

import {AnswerCardBarId} from '../../../playground/general-component/answer-card-bar-id';
import {ArticleCardBarId} from '../../../playground/general-component/article-card-bar-id';
import {ReviewCardBarId} from '../../../playground/general-component/review-card-bar-id';
import {languageHelper} from '../../../../tool/language-helper';

const basicCHNFont = {
  fontFamily: 'PingFang SC',
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 'normal'
};

const navyFont = {
  ...basicCHNFont,
  color: '#31394D'
};

// todo,动态显示结果数
class SearchInsightResultReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = SearchInsightResultReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div className="cell-wall">
        <div className="cell-membrane">
          <MDBRow style={{marginTop: '2vw'}}>
            <MDBCol className="px-0" size="10">
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ArticleCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ReviewCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <AnswerCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ReviewCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ArticleCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol className={classes.sideBar} size="2">
              <MDBListGroup style={{fontSize: '1.25vw', marginBottom: '1.56vw'}}>
                <MDBListGroupItem
                  hover
                  href="/article/create"
                  className={`d-flex justify-content-center align-items-center ${classes.listGroupItems}`}
                  style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
                  <img src={wrtiteArticle} className={classes.sidebarIcon} alt="icon"/> 写文章
                </MDBListGroupItem>
                <MDBListGroupItem
                  hover
                  href="/question/create"
                  className={`d-flex justify-content-center align-items-center ${classes.listGroupItems}`}
                  style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
                  <img  src={writeQuestion} className={classes.sidebarIcon} alt="icon"/> 提问题
                </MDBListGroupItem>
                <MDBListGroupItem
                  hover
                  href="/review/create"
                  className={`d-flex justify-content-center align-items-center ${classes.listGroupItems}`}
                  style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0}}>
                  <img src={writeReview} className={classes.sidebarIcon} alt="icon"/> 写短评
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBListGroup style={{fontSize: '1.1vw'}}>
                <MDBListGroupItem
                  className={`d-flex justify-content-start align-items-center ${classes.listGroupItems}`}
                  style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
                  <p style={{...navyFont, fontSize: '1.41vw', margin: '0'}}>标签</p>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={`py-0 d-flex justify-content-start align-items-center ${classes.listGroupItems}`}
                  style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
                  <MDBBtn className={classes.tagBtn}>求职技巧</MDBBtn>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={`py-0 d-flex justify-content-start align-items-center ${classes.listGroupItems}`}
                  style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
                  <MDBBtn className={classes.tagBtnSelected}>面试经历</MDBBtn>
                </MDBListGroupItem>
                <MDBListGroupItem
                  style={{height: '10vh', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}} />
              </MDBListGroup>

              {/*<Switch>*/}
              {/*{*/}
              {/*this.isUserLogin() &&*/}
              {/*<Route*/}
              {/*path="/article/create"*/}
              {/*component={routeProps => <ArticleCreate {...routeProps} />}*/}
              {/*/>*/}
              {/*}*/}
              {/*{*/}
              {/*this.isUserLogin() &&*/}
              {/*<Route*/}
              {/*path="/question/create"*/}
              {/*component={routeProps => <QuestionCreate {...routeProps} />}*/}
              {/*/>*/}
              {/*}*/}
              {/*{*/}
              {/*this.isUserLogin() &&*/}
              {/*<Route*/}
              {/*path="/review/create"*/}
              {/*component={routeProps => <ReviewCreate {...routeProps} />}*/}
              {/*/>*/}
              {/*}*/}
              {/*</Switch>*/}
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    );
  }
}

SearchInsightResultReact.i18n = [
  {},
  {}
];

SearchInsightResultReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
};

export const SearchInsightResult = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(SearchInsightResultReact));
