import React from 'react';
import {MDBBtn, MDBContainer, MDBCol, MDBIcon, MDBListGroup, MDBListGroupItem, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';


import {languageHelper} from '../../../../../../../tool/language-helper';

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
class SearchCompanyResultReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = SearchCompanyResultReact.i18n[languageHelper()];
  }

  render() {


    return (
      <MDBRow className="mt-3">
        <MDBCol md="9" lg="10">
          <MDBRow>
            <MDBCol size="2">
              209个结果
            </MDBCol>
            <MDBCol>

            </MDBCol>
          </MDBRow>
          <MDBRow>
          </MDBRow>
        </MDBCol>
        <MDBCol className="mt-5" md="3" lg="2">
          <div>
            <MDBContainer className="d-flex justify-content-center align-items-center mb-3" style={{backgroundColor: 'white', height: '60px'}}>
              <MDBRow>
                <MDBCol size="10" className="p-0">
                  <MDBIcon size="sm" className={classes.collectionIcon} icon="heart" />
                  <span className="pl-2" style={{...navyFont, fontSize: '16px'}}>我收藏的公司</span>
                </MDBCol>
                <MDBCol size="2" className="p-0" style={{fontSize: '12px'}}>
                  <MDBBtn rounded size="sm" className={`mx-0 my-0 py-1 px-2 ${classes.collectionBtn}`} >99</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <MDBListGroup 
              style={{fontSize: '12px'}}>
              <MDBListGroupItem
                className={`d-flex justify-content-start align-items-center ${classes.listGroupItems}`}
                style={{borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
                <p style={{...navyFont, fontSize: '18px', margin: '0'}}>标签</p>
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
              <MDBListGroupItem style={{height: '10vh',borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}/>
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
    );
  }
}

SearchCompanyResultReact.i18n = [
  {},
  {}
];

SearchCompanyResultReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const SearchCompanyResult = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(SearchCompanyResultReact));
