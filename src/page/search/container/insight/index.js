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

import {ReviewCardBarId} from '../../card/review-card-bar-id';
import {ArticleCardBarId} from '../../../playground/general-component/article-card-bar-id';
import {AnswerCardBarId} from '../../../playground/general-component/answer-card-bar-id';
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
    this.state = {
      backend: null,
      searchType: 'article'
    };
    // i18n
    this.text = SearchInsightResultReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    // try {
    //   const result = await getAsync(`/search?type=${this.state.searchType}&title=%E4%B8%BA%E4%BB%80%E4%B9%88`);
    //   // console.log(result)
    //   if (result && result.status) {
    //     this.setState(() => {
    //       return {backend: result.content};
    //     }, () => {console.log(this.state.backend,this.props.keyword);});
    //   }
    //   else {
    //     this.setState(() => {
    //       return {collectionNum: 0};
    //     });
    //   }
    // } catch (error) {
    //   // eslint-disable-next-line
    //   console.log(error);
    // }
    this.props.handleSearchType();
  }

  render() {
    return (
      <div className="cell-wall">
        <div className="cell-membrane">

          {
            this.props.backend ?
              (this.props.backend.status && this.props.backend.status.code === 2000 ? (this.props.backend.content.data.map((item, index) => (
                <MDBRow key={index} style={{margin: '1rem 0rem'}}>
                  <p>{item.content.id}</p>
                </MDBRow>))) : (this.props.backend.status.code === 4040 ? <p>没有搜索结果。</p> : <p>Here should be a loading card.</p>)
              )
              : null
          }

          <MDBRow style={{marginTop: '2vw'}}>
            <main className={classes.mainBody}>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ArticleCardBarId id={12} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ReviewCardBarId id={2} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <AnswerCardBarId id={12} questionId={12}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  {/*<ReviewCardBarId id={1} />*/}
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <ArticleCardBarId id={12} />
                </MDBCol>
              </MDBRow>
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
  handleSearchType: PropTypes.func.isRequired,
  backend: PropTypes.object.isRequired
};

export const SearchInsightResult = withRouter(SearchInsightResultReact);
