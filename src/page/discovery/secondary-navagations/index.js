import React from 'react';
import {MDBNav, MDBNavItem, MDBNavLink} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';

class TopNavReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      selectedTab: 1
    };
    // i18n
    this.text = TopNavReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div>
        <div className="classic-tabs">
          <MDBNav
            classicTabs
            className="d-flex justify-content-center"
          >
            <MDBNavItem className="ml-0">
              <MDBNavLink
                to={`${this.props.match.url}/insight`}
                onClick={
                  () => {
                    this.setState({selectedTab: 1});
                  }
                }
                className={classes.tabItems}
              >
                洞见
              </MDBNavLink>
            </MDBNavItem>

            <MDBNavItem>
              <MDBNavLink
                to={`${this.props.match.url}/video`}
                onClick={
                  () => {
                    this.setState({selectedTab: 2});
                  }
                }
                className={classes.tabItems}
              >
                视频
              </MDBNavLink>
            </MDBNavItem>

          </MDBNav>
        </div>
      </div>
    );
  }
}

TopNavReact.i18n = [
  {},
  {}
];

TopNavReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const TopNav = withRouter(TopNavReact);
