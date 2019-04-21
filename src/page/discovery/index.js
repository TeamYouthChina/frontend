import React from 'react';
import {MDBCol, MDBListGroup, MDBListGroupItem, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';
import classes from './index.module.css';
import writeArticle from '../playground/discovery-old/assets/writeArticle.svg';
import writeQuestion from '../playground/discovery-old/assets/writeQuestion.svg';
import writeReview from '../playground/discovery-old/assets/writeReview.svg';
import InfiniteScroll from 'react-infinite-scroll-component';

import {ArticleCardBarId} from '../playground/general-component/article-card-bar-id';
import {AnswerCardBarId} from '../playground/general-component/answer-card-bar-id';
import {ReviewCardBarId} from '../playground/general-component/review-card-bar-id';
import {languageHelper} from '../../tool/language-helper';
import {getAsync} from '../../tool/api-helper';
import {Loading} from '../job-for-you/component/loading';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

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

class DiscoveryReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null,
      //搜索类型，三种文章类型混合搜索
      searchType: ['articles', 'questions', 'editorials'],
      //分页
      page: 0,
      //后端状态码
      code: null,
      // infiniteScroll是否可以继续滚动
      hasMore: true,
      //存储文章条目
      list: []
    };
    // i18n
    this.text = DiscoveryReact.i18n[languageHelper()];
  }

  getMore = async () => {
    let result = [];
    let count = 0;
    const len = this.state.searchType.length;
    const limit = 6 / len;
    let code = null;
    while (count < len) {
      const temp = await this.getData(this.state.searchType[count++], limit);
      code = temp.status.code;
      if (code === 5001) {
        // 权宜之计：后端的锅
        this.setState({
          code
        });
        return;
      }
      result = [...result, ...temp.content.data];
      // eslint-disable-next-line
      console.log(code);
    }
    // eslint-disable-next-line
    console.log(result.length);
    if(result.length === 0) {
      this.setState(()=>{
        return {hasMore: false};
      });
    }
    // const result = await mockGetAsync(content);
    this.setState((prevState) => {
      return {
        list: prevState.list.concat(result),
        page: this.state.page + 1,
        code
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
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    switch (this.state.code) {
      case 2000:
        return (
          <div className="cell-wall">
            <div className="cell-membrane">
              <MDBRow style={{marginTop: '2vw'}}>
                <main className={classes.mainBody}>
                  {this.state.code === 2000 ?
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
                                    return <AnswerCardBarId
                                      questionId={item.content.id}
                                      questionTitle={item.content.title}
                                      id={item.content.answers[0].id} />;
                                  case 'editorial':
                                    return <ReviewCardBarId id={item.content.id} />;
                                }
                              })()}
                            </MDBCol>
                          </MDBRow>
                        ))
                      }
                    </InfiniteScroll> : <Loading />}

                </main>
                <aside className={classes.sideBar}>
                  <MDBListGroup style={{fontSize: '1.25vw', marginBottom: '1.56vw'}}>
                    <MDBListGroupItem
                      hover
                      href="/article/create"
                      className={classes.listGroupItemsInsight}
                    >
                      <img src={writeArticle} className={classes.sidebarIcon} alt="icon" /> 写文章
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

                </aside>
              </MDBRow>
            </div>
          </div>
        );
      case 5001:
        // 权宜之计：后端的锅
        return (<Redirect to={`/login?to=${this.props.location.pathname}`} />);
      default:
        return null;
    }
  }
}

DiscoveryReact.i18n = [
  {},
  {}
];

DiscoveryReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Discovery = withRouter(DiscoveryReact);
