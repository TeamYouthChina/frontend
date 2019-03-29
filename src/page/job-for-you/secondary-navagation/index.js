import React from 'react';
import {MDBCol, MDBRow, MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';

const basicCHNFont = {
  fontFamily: 'PingFang SC',
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 'normal'
};

const navlinkFont = {
  ...basicCHNFont,
  color: '#31394D',
  fontSize: '16px'
};

class RecommendationJobsTopNavReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      jobType: [
        {id: 1, name: '校园招聘', url: 'campus'},
        {id: 2, name: '社会招聘', url: 'general'},
        {id: 3, name: '实习招聘', url: 'intern'}
      ]
    };
    // i18n
    this.text = RecommendationJobsTopNavReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div>
        <div className="classic-tabs">
          <MDBNav
            classicTabs
            expand="md"
            className="d-flex justify-content-center"
            style={{
              boxShadow: 'none',
              borderBottom: 'solid #E0E0E0 1px',
            }}
          >
            <MDBRow>
              {this.state.jobType.map((item) => {
                return (
                  <MDBCol key={item.id} size="12" md="4">
                    <MDBNavItem
                      className="ml-0 text-center p-0">
                      <MDBNavLink
                        className={this.props.location.pathname.includes(item.url) ? `active font-weight-bold ${classes.activeTabFontColor}` : ''}
                        to={`${this.props.match.url}/${item.url}`}
                        style={navlinkFont}
                      >
                        <p className="pr-2 py-0 m-0">{item.name}</p>
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBCol>
                );
              })}
            </MDBRow>
          </MDBNav>
        </div>
      </div>
    );
  }
}

RecommendationJobsTopNavReact.i18n = [
  {},
  {}
];

RecommendationJobsTopNavReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const RecommendationJobsTopNav = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(RecommendationJobsTopNavReact));
