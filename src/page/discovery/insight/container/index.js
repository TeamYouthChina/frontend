import React from 'react';
import {
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow
} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import wrtiteArticle from '../../assets/writeArticle.svg';
import writeQuestion from '../../assets/writeQuestion.svg';
import writeReview from '../../assets/writeReview.svg';

import {AnswerCardBarId} from '../../card/answer-card-bar-id';
import {ArticleCardBarId} from '../../card/article-card-bar-id';
import {ReviewCardBarId} from '../../card/review-card-bar-id';
import {languageHelper} from '../../../../tool/language-helper';
import {getAsync} from '../../../../tool/api-helper';

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

class DiscoveryInsightReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null
    };
    // i18n
    this.text = DiscoveryInsightReact.i18n[languageHelper()];
  }


  async componentDidMount() {
    try {
      const result = await getAsync('/discovery');
      if (result && result.status) {
        this.setState(() => {
          return {backend: result.content};
        });
      }
      else {
        this.setState(() => {
          return {collectionNum: 0};
        });
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  render() {
    return (
      <div className="cell-wall">
        <div className="cell-membrane">
          <MDBRow style={{marginTop: '2vw'}}>
            <MDBCol className="px-0" size="10">
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ArticleCardBarId id={1} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ReviewCardBarId id={1} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <AnswerCardBarId id={1} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ReviewCardBarId id={1} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ArticleCardBarId id={1} />
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol className={classes.sideBar} size="2">
              <MDBListGroup style={{fontSize: '1.25vw', marginBottom: '1.56vw'}}>
                <MDBListGroupItem
                  hover
                  href="/article/create"
                  className={classes.listGroupItemsInsight}
                >
                  <img src={wrtiteArticle} className={classes.sidebarIcon} alt="icon" /> 写文章
                </MDBListGroupItem>
                <MDBListGroupItem
                  hover
                  href="/question/create"
                  className={classes.listGroupItemsInsight}
                >
                  <img src={writeQuestion} className={classes.sidebarIcon} alt="icon" /> 提问题
                </MDBListGroupItem>
                <MDBListGroupItem
                  hover
                  href="/review/create"
                  className={classes.listGroupItemsInsight}
                >
                  <img src={writeReview} className={classes.sidebarIcon} alt="icon" /> 写短评
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBListGroup style={{fontSize: '1.1vw'}}>
                <MDBListGroupItem
                  className={classes.listGroupItemsTag}
                >
                  <p style={navyFont}>标签</p>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={classes.listGroupItems}
                >
                  <button className={classes.tagBtn}>求职技巧</button>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={classes.listGroupItems}
                >
                  <button className={classes.tagBtnSelected}>面试经历</button>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={classes.listGroupItems}
                  style={{height: '10vh'}} />
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

DiscoveryInsightReact.i18n = [
  {},
  {}
];

DiscoveryInsightReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const DiscoveryInsight = withRouter(DiscoveryInsightReact);
