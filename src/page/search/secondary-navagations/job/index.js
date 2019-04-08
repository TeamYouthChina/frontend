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
import {connect} from 'react-redux';

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

class SearchJobsNavItemReact extends React.Component {
  constructor(props) {
    super(props);
    this.text = SearchJobsNavItemReact.i18n[languageHelper()];

    this.state = {
      // activeItemClassicTabs1: "1",
      collapseID: '',
      tabsContent: '职位',
    };

    // this.toggleClassicTabs1 = this.toggleClassicTabs1.bind(this);
  }

  // eslint-disable-line
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
        <MDBNavbar light expand="md" style={{
          background: 'white',
          boxShadow: 'none',
          borderTop: 'solid #E0E0E0 1px',
          // borderBottom: 'solid #E0E0E0 1px'
          fontSize: '1.25vw'
        }}>
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
                    <div className="d-md-inline" style={navyFont}>发步时间
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
                    <div className="d-md-inline" style={navyFont}>实习时间
                      <MDBIcon icon="caret-down" style={caretIconColor} />
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">立即入职</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">一个月以内</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">一个月-三个月</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">三个月以上</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>

              <MDBNavItem className="mx-2">
                <MDBDropdown>
                  <MDBDropdownToggle nav>
                    <div className="d-md-inline" style={navyFont}>工资
                      <MDBIcon icon="caret-down" style={caretIconColor} />
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">5000以下</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">5001-10000</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">10001-20000</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">20000以上</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>

              <MDBNavItem className="mx-2">
                <MDBDropdown>
                  <MDBDropdownToggle nav>
                    <div className="d-md-inline" style={navyFont}>学历要求
                      <MDBIcon icon="caret-down" style={caretIconColor} />
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">大专</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">本科</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">硕士研究生</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">博士研究生</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavItem>

              <MDBNavItem className="mx-2">
                <MDBDropdown>
                  <MDBDropdownToggle nav>
                    <div className="d-md-inline" style={navyFont}>行业
                      <MDBIcon icon="caret-down" style={caretIconColor} />
                    </div>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">互联网/智能科技</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">金融/咨询</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">汽车/机械/制造</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">地产/建筑</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">消费品</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">生物/医疗</MDBDropdownItem>
                    <MDBDropdownItem className={classes.dropdownItems}
                      style={navyFont} href="#!">能源</MDBDropdownItem>
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

SearchJobsNavItemReact.i18n = [
  {},
  {}
];

SearchJobsNavItemReact.prototypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const SearchJobsNavItem = withRouter(connect((state) => {
  return {
    bodyClientWidth: state.bodyClientWidth
  };
})(SearchJobsNavItemReact));
