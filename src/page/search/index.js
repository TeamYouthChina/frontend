import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {MDBCol, MDBContainer, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';

import {SearchJobsNavItem} from './secondary-navagations/job';
import {SearchCompaniesNavItem} from './secondary-navagations/company';
import {SearchInsightNavItem} from './secondary-navagations/insight';
import {SearchConnectionNavItem} from './secondary-navagations/coonection';
import {SearchJobResult} from './container/job';
import {SearchCompanyResult} from './container/company';
import {SearchInsightResult} from './container/insight';
import {SearchConnectionResult} from './container/connection';
import {SearchInput} from './component/search-input';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {getAsync} from '../../tool/api-helper';

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
      //搜索关键词
      keyword: '',
      //搜索到的数据
      backend: [],
      
      //后端状态码
      code: null,
      //分页
      page: 0,
      //搜索类型
      searchType: null
    };
  }

  handleInputKeyword = event => {
    this.setState({
      keyword: event.target.value
    });
  };

  handleKeywordSearch = async (event) => {
    event.preventDefault();
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
    // eslint-disable-next-line
    console.log(result);
    this.setState(() => {
      return {
        backend: result,
        code
      };
    });
  };

  getData = async (parameter, limit) => {
    try {
      const result = await getAsync(`/search?type=${parameter}&title=${this.state.keyword}&limit=${limit}&page=${this.state.page}`);
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

  //切换搜索页面时，更改搜索类型
  handleSearchType = () => {
    // eslint-disable-next-line
    const path = this.props.location.pathname;

    switch (true) {
      case path.includes('/job'):
        this.setState(() => {
          return {searchType: ['job']};
        });
        break;
      case path.includes('/company'):
        this.setState(() => {
          return {searchType: ['company']};
        });
        break;
      case path.includes('/insight'):
        this.setState(() => {
          return {searchType: ['article', 'question', 'editorial']};
        });
        break;
      case path.includes('/connection'):
        this.setState(() => {
          return {searchType: ['user']};
        });
    }
  };

  componentDidMount() {
    this.handleSearchType();
  }

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
                  <SearchInput
                    keyword={this.state.keyword}
                    onSubmit={this.handleKeywordSearch}
                    onChange={this.handleInputKeyword} />
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
                render={(props) => <SearchInsightNavItem {...props} />}
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
                render={(props) =>
                  <SearchJobResult
                    {...props}
                    keyword={this.state.keyword}
                    backend={this.state.backend}
                    handleSearchType={this.handleSearchType} />
                }
                // component={SearchJobResult}
              />
              <Route
                path={`${this.props.match.url}/company`}
                render={(props) =>
                  <SearchCompanyResult
                    {...props}
                    keyword={this.state.keyword}
                    backend={this.state.backend}
                    handleSearchType={this.handleSearchType} />
                }
              />
              <Route
                path={`${this.props.match.url}/insight`}
                render={(props) =>
                  <SearchInsightResult
                    {...props}
                    code={this.state.code}
                    backend={this.state.backend}
                    handleSearchType={this.handleSearchType} />
                }
              />
              <Route
                path={`${this.props.match.url}/connection`}
                render={(props) =>
                  <SearchConnectionResult
                    {...props}
                    keyword={this.state.keyword}
                    backend={this.state.backend}
                    handleSearchType={this.handleSearchType} />
                }
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

export const Search = withRouter(SearchReact);
