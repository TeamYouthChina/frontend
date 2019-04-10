import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {MDBCol, MDBContainer, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {SearchJobsNavItem} from './secondary-navagations/job';
import {SearchCompaniesNavItem} from './secondary-navagations/company';
import {SearchInsightNavItem} from './secondary-navagations/insight';
import {SearchVideoNavItem} from './secondary-navagations/video';
import {SearchConnectionNavItem} from './secondary-navagations/coonection';
import {SearchJobResult} from './container/job';
import {SearchCompanyResult} from './container/company';
import {SearchVideoResult} from './container/video';
import {SearchInsightResult} from './container/insight';
import {SearchConnectionResult} from './container/connection';
import {SearchInput} from './component/search-input';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

const basicCHNFont = {
  fontFamily: 'PingFang SC',
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 'normal'
};

class SearchReact extends React.Component {
  constructor(props) {
    super(props);
    this.text = SearchReact.i18n[languageHelper()];

    this.state = {
      // activeItemClassicTabs1: "1",
      collapseID: '',
      tabsContent: '职位',
      keyword: null //搜索关键词
    };

    // this.toggleClassicTabs1 = this.toggleClassicTabs1.bind(this);
  }

  handleInputKeyword = event => {
    this.setState({
      keyword: event.target.value
    });
  };
  
  handleKeywordSearch = () => {
    
  };
  
  handleTabsContent = tabsContent => {
    this.setState({
      ...this.state,
      tabsContent
    });
  };

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({collapseID: (prevState.collapseID !== collapseID ? collapseID : '')}));
  };

  render() {
    // eslint-disable-next-line
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }

    return (
      <div
        style={{
          padding: 0,
        }}
      >
        {/*导航栏细胞*/}
        <div className="cell-wall" style={{
          backgroundColor: 'white'
        }}>
          <div className="cell-membrane">
            <MDBContainer>
              <MDBRow>
                <MDBCol className="mt-5 p-0 d-flex align-items-center">
                  <SearchInput keyword={this.state.keyword} onSubmit={this.handleKeywordSearch} onChange={this.handleInputKeyword}/>
                </MDBCol>
              </MDBRow>
            </MDBContainer>

            {/*eslint-disable*/}
            <Switch>
              <Route
                path={`${this.props.match.url}/job`}
                component={routeProps => <SearchJobsNavItem basicCHNFont={basicCHNFont} />}
              />
              <Route
                path={`${this.props.match.url}/company`}
                component={routeProps => <SearchCompaniesNavItem basicCHNFont={basicCHNFont} />}
              />
              <Route
                path={`${this.props.match.url}/insight`}
                component={routeProps => <SearchInsightNavItem basicCHNFont={basicCHNFont} />}
              />
              <Route
                path={`${this.props.match.url}/video`}
                component={routeProps => <SearchVideoNavItem basicCHNFont={basicCHNFont} />}
              />
              <Route
                path={`${this.props.match.url}/connection`}
                component={routeProps => <SearchConnectionNavItem basicCHNFont={basicCHNFont} />}
              />
              <Redirect to={`${this.props.match.url}/job`} />
            </Switch>
          </div>
        </div>

        {/*搜索结果细胞*/}
        <div className="cell-wall" style={{backgroundColor: '#F3F5F7'}}>
          <div className="cell-membrane">
            <Switch>
              <Route
                path={`${this.props.match.url}/job`}
                component={SearchJobResult}
              />
              <Route
                path={`${this.props.match.url}/company`}
                component={SearchCompanyResult}
              />
              <Route
                path={`${this.props.match.url}/video`}
                component={SearchVideoResult}
              />
              <Route
                path={`${this.props.match.url}/insight`}
                component={SearchInsightResult}
              />
              <Route
                path={`${this.props.match.url}/connection`}
                component={SearchConnectionResult}
              />
              <Redirect to={`${this.props.match.url}/job`} />
            </Switch>
            {/*eslint-enable*/}
          </div>
        </div>
      </div>
    );
  }
}

SearchReact.i18n = [
  {},
  {}
];

SearchReact.prototypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,

};

export const Search = connect((state) => {
  return {
    bodyClientWidth: state.bodyClientWidth
  };
})(SearchReact);
