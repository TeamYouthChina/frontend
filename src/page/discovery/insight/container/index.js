import React from 'react';
import {MDBCol, MDBListGroup, MDBListGroupItem, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import wrtiteArticle from '../../assets/writeArticle.svg';
import writeQuestion from '../../assets/writeQuestion.svg';
import writeReview from '../../assets/writeReview.svg';
import InfiniteScroll from 'react-infinite-scroll-component';

import {ArticleCardBarId} from '../../../playground/general-component/article-card-bar-id';
import {AnswerCardBarId} from '../../../playground/general-component/answer-card-bar-id';
import {ReviewCardBarId} from '../../../playground/general-component/review-card-bar-id';
import {languageHelper} from '../../../../tool/language-helper';
import {getAsync} from '../../../../tool/api-helper';
import {Loading} from '../../../job-for-you/component/loading';

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
      backend: null,
      searchType: ['articles', 'questions', 'editorials'],
      page: 0,
      code: null,
      hasMore: true,
      list: []
    };
    // i18n
    this.text = DiscoveryInsightReact.i18n[languageHelper()];
  }

  getMore = async () => {
    let result = [];
    let count = 0;
    const len = this.state.searchType.length;
    const limit = 6 / len;
    let code = null;
    while (count < len) {
      const temp = await this.getData(this.state.searchType[count++], limit);
      result = [...result, ...temp.content.data];
      code = temp.status.code;
      // eslint-disable-next-line
      console.log(code);
    }
    // const result = await mockGetAsync(content);
    this.setState((prevState) => {
      return {
        list: prevState.list.concat(result),
        page: this.state.page + 1
        // hasMore: backend.content.hasMore && prevState.itemList.length < 23
      };
    });
  };

  getData = async (parameter, limit) => {
    try {
      const result = await getAsync(`/discovery/${parameter}?limit=${limit}&page=${this.state.page}`);
      if (result && result.status) {
        return result;
      } else {
        return null;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  async componentDidMount() {
    await this.getMore();
  }

  render() {
    return (
      <div className="cell-wall">
        <div className="cell-membrane">
          <MDBRow style={{marginTop: '2vw'}}>
            <main className={classes.mainBody}>
              <InfiniteScroll
                dataLength={this.state.list.length}
                hasMore={this.state.hasMore}
                loader={
                  <Loading />
                }
                next={this.getMore}
              >
                {
                  this.state.list.map((item, index) => (
                    <MDBRow key={index} className={classes.cardBarRow}>
                      <MDBCol>
                        {(() => {
                          switch (item.type) {
                            case 'article':
                              return <ArticleCardBarId id={item.content.id} />;
                            case 'question':
                              return <AnswerCardBarId id={item.content.id} />;
                            case 'briefReview':
                              return <ReviewCardBarId id={item.content.id} />;
                          }
                        })()}
                      </MDBCol>
                    </MDBRow>
                  ))
                }
              </InfiniteScroll>
            </main>
            <aside className={classes.sideBar}>
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
            </aside>
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
