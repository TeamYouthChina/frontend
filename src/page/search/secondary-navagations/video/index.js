import React from 'react';
import {
  MDBDropdownItem,
  MDBNavItem,
  MDBNavLink,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBIcon
} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';
import classes from '../index.module.css';

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

const navlinkIcon = {
  width: '20px',
  marginRight: '5px'
};

const caretIconColor = {
  color: '#8D9AAF'
};

class SearchVideoNavItemReact extends React.Component {
  constructor(props) {
    super(props);
    this.text = SearchVideoNavItemReact.i18n[languageHelper()];

    this.state = {
      // activeItemClassicTabs1: "1",
      collapseID: '',
      tabsContent: '视频',
    };

    // this.toggleClassicTabs1 = this.toggleClassicTabs1.bind(this);
  }

  // eslint-disable-next-line
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
    const pathname = this.props.location.pathname;

    return (
      <div>
        <MDBNavbar light expand="md" className={classes.nav}>
          {/*<MDBContainer>*/}
          <MDBNavbarToggler onClick={this.toggleCollapse('navbarCollapse')} />
          <MDBCollapse id="navbarCollapse" isOpen={this.state.collapseID} navbar>
            <MDBNavbarNav left>

              <MDBNavItem className="mx-0">
                <MDBDropdown>
                  <MDBDropdownToggle nav>
                    <div className="d-md-inline" style={navyFont}>
                      {this.state.tabsContent} <MDBIcon icon="caret-down" style={{color: '#8D9AAF'}} />
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu className={classes.menu}>
                    <MDBDropdownItem
                      className={`p-0 ${classes.dropdownItems}${pathname.includes('/search-job-result') ? ' active' : ''}`}
                      onClick={() => this.handleTabsContent('职位')}>
                      <MDBNavLink
                        className="p-2 d-flex justify-content-center align-items-center"
                        style={navyFont}
                        to={'/search/job'}
                      >
                        <MDBIcon style={navlinkIcon} icon="user-circle" /> 职位
                      </MDBNavLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className={`p-0 ${classes.dropdownItems}${pathname.includes('/search-company-result') ? ' active' : ''}`}
                      onClick={() => this.handleTabsContent('公司')}>
                      <MDBNavLink
                        className="p-2 d-flex justify-content-center align-items-center"
                        style={navyFont}
                        to={'/search/company'}
                      >
                        <MDBIcon style={navlinkIcon} icon="building" /> 公司
                      </MDBNavLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className={`p-0 ${classes.dropdownItems}${pathname.includes('/search-community-result') ? ' active' : ''}`}
                      onClick={() => this.handleTabsContent('社区')}>
                      <MDBNavLink
                        className="p-2 d-flex justify-content-center align-items-center"
                        style={navyFont}
                        to={'/search/insight'}>
                        <MDBIcon style={navlinkIcon} icon="bullhorn" /> 洞见
                      </MDBNavLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className={`p-0 ${classes.dropdownItems}${pathname.includes('/search-video-result') ? ' active' : ''}`}
                      onClick={() => this.handleTabsContent('视频')}>
                      <MDBNavLink
                        className="p-2 d-flex justify-content-center align-items-center"
                        style={navyFont}
                        to={'/search/video'}>
                        <MDBIcon style={navlinkIcon} icon="play-circle" /> 视频
                      </MDBNavLink>
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      className={`p-0 ${classes.dropdownItems}${pathname.includes('/search-connect-result') ? ' active' : ''}`}
                      onClick={() => this.handleTabsContent('人脉')}>
                      <MDBNavLink
                        className="p-2 d-flex justify-content-center align-items-center"
                        style={navyFont}
                        to={'/search/connection'}>
                        <MDBIcon style={navlinkIcon} icon="users" /> 人脉
                      </MDBNavLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>

              <MDBNavItem className="mx-2">
                <MDBDropdown>
                  <MDBDropdownToggle nav>
                    <div className="d-md-inline" style={navyFont}>发布时间
                      <MDBIcon icon="caret-down" style={caretIconColor} />
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">最近发布</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">最近一周</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">最近一个月</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>

              <MDBNavItem className="mx-2">
                <MDBDropdown>
                  <MDBDropdownToggle nav>
                    <div className="d-md-inline" style={navyFont}>视频类型
                      <MDBIcon icon="caret-down" style={caretIconColor} />
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">行业</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">生活</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">娱乐</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>

            </MDBNavbarNav>
          </MDBCollapse>
          {/*</MDBContainer>*/}
        </MDBNavbar>
      </div>
    );
  }
}

SearchVideoNavItemReact.i18n = [
  {},
  {}
];

SearchVideoNavItemReact.prototypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const SearchVideoNavItem = withRouter(SearchVideoNavItemReact);
