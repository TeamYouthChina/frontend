import React from 'react';
import {
  MDBBtn,
  MDBCol,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow
} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import filter from '../../assets/filter.svg';
import heart from '../../assets/heart.svg';

import {JobCardBarId} from '../../../playground/general-component/job-card-bar-id';
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
class SearchJobResultReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = SearchJobResultReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div className="cell-wall">
        <div className="cell-membrane">
          <MDBRow style={{marginTop: '2vw'}}>
            <MDBCol className="px-0" size="10">
              <MDBRow style={{marginBottom: '1.2vw'}}>
                <MDBCol
                  size="2" className="px-0 d-flex justify-content-center align-items-center"
                  style={{color: '#8D9AAF', fontSize: '1.09vw'}}>
                  5个结果
                </MDBCol>
                <MDBCol className="ml-auto d-flex justify-content-end" size="2">
                  <MDBDropdown>
                    <MDBDropdownToggle
                      className={`m-0 ${classes.dropdownButton}`} size="sm"
                      style={{fontSize: '1.1vw', border: '1px solid #DBE5F7'}}>
                      相关性 <img className={classes.filter} src={filter} alt="icons" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                      <MDBDropdownItem className={classes.dropdownItems}>规则1</MDBDropdownItem>
                      <MDBDropdownItem className={classes.dropdownItems}>规则2</MDBDropdownItem>
                      <MDBDropdownItem className={classes.dropdownItems}>规则3</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.jobCardBarRow}>
                <MDBCol>
                  <JobCardBarId />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.jobCardBarRow}>
                <MDBCol>
                  <JobCardBarId />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.jobCardBarRow}>
                <MDBCol>
                  <JobCardBarId />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.jobCardBarRow}>
                <MDBCol>
                  <JobCardBarId />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.jobCardBarRow}>
                <MDBCol>
                  <JobCardBarId />
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol style={{marginTop: '4vw'}} size="2">
              <div>
                <div
                  className={`d-flex justify-content-center align-items-center ${classes.collectionSidebar}`}>
                  <MDBRow>
                    <MDBCol size="10" className="p-0">
                      <img src={heart} className={classes.collectionIcon} alt="icon"/>
                      <span className="pl-2" style={{...navyFont, fontSize: '1.1vw'}}>我收藏的职位</span>
                    </MDBCol>
                    <MDBCol size="2" className="p-0" style={{fontSize: '0.93vw'}}>
                      <MDBBtn rounded size="sm" className={`mx-0 my-0 py-1 px-2 ${classes.collectionBtn}`}>99</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </div>
                <MDBListGroup
                  style={{fontSize: '1.1vw'}}>
                  <MDBListGroupItem
                    className={`d-flex justify-content-start align-items-center ${classes.listGroupItems}`}
                    style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
                    <p style={{...navyFont, fontSize: '1.41vw', margin: '0'}}>标签</p>
                  </MDBListGroupItem>
                  <MDBListGroupItem
                    className={`py-0 d-flex justify-content-start align-items-center ${classes.listGroupItems}`}
                    style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
                    <MDBBtn outline rounded size="sm" className={classes.tagBtn}>求职技巧</MDBBtn>
                  </MDBListGroupItem>
                  <MDBListGroupItem
                    className={`py-0 d-flex justify-content-start align-items-center ${classes.listGroupItems}`}
                    style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
                    <MDBBtn outline rounded size="sm" className={classes.tagBtnSelected}>面试经历</MDBBtn>
                  </MDBListGroupItem>
                  <MDBListGroupItem
                    style={{height: '10vh', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}} />
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
              </div>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    );
  }
}

SearchJobResultReact.i18n = [
  {},
  {}
];

SearchJobResultReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
};

export const SearchJobResult = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(SearchJobResultReact));
