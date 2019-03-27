import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import classes from './index.module.css';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBIcon
} from 'mdbreact';
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
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

const basicCHNFont = {
  fontFamily: 'PingFang SC',
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 'normal'
};
// eslint-disable-next-line
const navyFont = {
  ...basicCHNFont,
  color: '#31394D'
};
// eslint-disable-next-line
const navlinkIcon = {
  width: '20px',
  marginRight: '5px'
};

class SearchReact extends React.Component {
  constructor(props) {
    super(props);
    this.text = SearchReact.i18n[languageHelper()];

    this.state = {
      // activeItemClassicTabs1: "1",
      collapseID: '',
      tabsContent: '职位',
      keyword: '' //搜索关键词
    };

    // this.toggleClassicTabs1 = this.toggleClassicTabs1.bind(this);
  }

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
                  <MDBIcon className={`${classes.searchIcon} mr-1 mr-md-3`} icon="search" size="2x" />
                  <input
                    className={`flex-fill p-0 form-control ${classes.searchInput}`}
                    placeholder="通过以下方式搜索"
                    style={{
                      fontSize: '36px',
                      width: '80vw'
                    }} />
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
                component={routeProps => <SearchJobResult basicCHNFont={basicCHNFont} />}
              />
              <Route
                path={`${this.props.match.url}/company`}
                component={routeProps => <SearchCompanyResult basicCHNFont={basicCHNFont} />}
              />
              <Route
                path={`${this.props.match.url}/video`}
                component={routeProps => <SearchVideoResult basicCHNFont={basicCHNFont} />}
              />
              <Route
                path={`${this.props.match.url}/insight`}
                component={routeProps => <SearchInsightResult basicCHNFont={basicCHNFont} />}
              />
              <Route
                path={`${this.props.match.url}/connection`}
                component={routeProps => <SearchVideoResult basicCHNFont={basicCHNFont} />}
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
