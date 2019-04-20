import React from 'react';
import {MDBListGroup, MDBListGroupItem, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import wrtiteArticle from '../../assets/writeArticle.svg';
import writeQuestion from '../../assets/writeQuestion.svg';
import writeReview from '../../assets/writeReview.svg';

import {CardMapper} from '../../component/mapper';
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
      backend: [],
      searchType: 'article',
      code: 0
    };
    // i18n
    this.text = SearchInsightResultReact.i18n[languageHelper()];
  }
  
  componentDidMount() {
    //搜索页面切换时，重新set搜索类型
    this.props.handleSearchType();
  }

  componentWillUnmount() {
    this.props.handleUnmount();
  }

  // shouldComponentUpdate(nextProps) {
  //   return this.props !== nextProps;
  // }

  render() {
    return (
      <div className="cell-wall">
        <div className="cell-membrane">

          <MDBRow style={{marginTop: '2vw'}}>
            <main className={classes.mainBody}>
              {
                this.props.backend.length ?
                  (this.props.code === 2000 ? <CardMapper backend={this.props.backend}/> : (this.props.backend.status.code === 4040 ? <p>没有搜索结果。</p> :
                    <p>Here should be a loading card.</p>)
                  ) : null
              }
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
  backend: PropTypes.array.isRequired,
  code: PropTypes.number.isRequired,
  handleUnmount: PropTypes.func.isRequired
};

export const SearchInsightResult = withRouter(SearchInsightResultReact);
