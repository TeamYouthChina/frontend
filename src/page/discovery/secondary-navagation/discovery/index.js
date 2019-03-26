import React from 'react';
import {MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {languageHelper} from '../../../../tool/language-helper';

class DiscoveryTopNavReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      selectedTab: null
    };
    // i18n
    this.text = DiscoveryTopNavReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div>
        <div className="classic-tabs">
          <MDBNav
            classicTabs
            className="d-flex justify-content-left"
            style={{
              boxShadow: 'none',
              borderBottom: 'solid #E0E0E0 1px',
              paddingLeft: '159px'
              // left: '11%'
            }}>
            <MDBNavItem className="ml-0">
              <MDBNavLink
                to={`${this.props.match.url}/article`}
                onClick={
                  () => {
                    this.setState({selectedTab: 1});
                  }
                }
                className={this.state.selectedTab === 1 ? 'active font-weight-bold' : ''}
                style={{
                  color: '#454F69',
                  fontSize: '16px'
                }}>
                {this.text.article}
              </MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink
                to={`${this.props.match.url}/review`}
                onClick={
                  () => {
                    this.setState({selectedTab: 2});
                  }
                }
                className={this.state.selectedTab === 2 ? 'active font-weight-bold' : ''}
                style={{
                  color: '#454F69',
                  fontSize: '16px'
                }}>
                {this.text.review}
              </MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink
                to={`${this.props.match.url}/question-answer`}
                onClick={
                  () => {
                    this.setState({selectedTab: 3});
                  }
                }
                className={this.state.selectedTab === 3 ? 'active font-weight-bold' : ''}
                style={{
                  color: '#454F69',
                  fontSize: '16px'
                }}>
                {this.text.questionAnswer}
              </MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink
                to={`${this.props.match.url}/video`}
                onClick={
                  () => {
                    this.setState({selectedTab: 4});
                  }
                }
                className={this.state.selectedTab === 4 ? 'active font-weight-bold' : ''}
                style={{
                  color: '#454F69',
                  fontSize: '16px'
                }}>
                {this.text.video}
              </MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink
                to={`${this.props.match.url}/connection`}
                onClick={
                  () => {
                    this.setState({selectedTab: 5});
                  }
                }
                className={this.state.selectedTab === 5 ? 'active font-weight-bold' : ''}
                style={{
                  color: '#454F69',
                  fontSize: '16px'
                }}>
                {this.text.connection}
              </MDBNavLink>
            </MDBNavItem>
          </MDBNav>
        </div>
        <div style={{height: '78px'}}>
        </div>
      </div>
    );
  }
}

DiscoveryTopNavReact.i18n = [
  {
    article: '文章',
    connection: '人脉',
    review: '长评',
    questionAnswer: '问答',
    video: '视频',
  },
  {
    article: 'Article',
    connection: 'Connection',
    review: 'Review',
    questionAnswer: 'Question & Answer',
    video: 'VideoMobile',
  }
];

DiscoveryTopNavReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const DiscoveryTopNav = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(DiscoveryTopNavReact));
