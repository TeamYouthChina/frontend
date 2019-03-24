import React from 'react';
import {
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
            <MDBCol style={{marginTop: '4vw', marginLeft: 0, padding: 0}} size="2">
              <div>
                <div
                  className={`d-flex justify-content-center align-items-center ${classes.collectionSidebar}`}>
                  <img src={heart} className={classes.collectionIcon} alt="icon" />
                  <span style={{...navyFont, fontSize: '1.1vw', marginLeft: '0.5vw', marginRight: '0.5vw'}}>我收藏的职位</span>
                  <button className={classes.collectionBtn}>99</button>
                </div>
                <MDBListGroup
                  style={{fontSize: '1.1vw', marginLeft: '1.56vw'}}>
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
