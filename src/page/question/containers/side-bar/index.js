import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';

import {MDBListGroup,MDBListGroupItem,MDBIcon,MDBCol} from 'mdbreact';

// import classes from './sidebar.module.css';

class SideBarReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:[]
    };
    // i18n
    this.text = SideBarReact.i18n[languageHelper()];
  }

  componentDidMount() {
    
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend !== null) ? (
      <React.Fragment>
        <MDBCol>
          <MDBListGroup style={{
            fontSize: '16px'
          }}>
            <MDBListGroupItem
              hover
              href="/article/create"
              className="d-flex justify-content-center align-items-center"
              style={{color: '#454F69', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
              <MDBIcon fa icon="edit" className="mr-2"/> 写文章
            </MDBListGroupItem>
            <MDBListGroupItem
              hover
              href="/question/create"
              className="d-flex justify-content-center align-items-center"
              style={{color: '#454F69', borderLeftWidth: 0, borderRightWidth: 0}}>
              <MDBIcon far icon="question-circle" className="mr-2"/> 提问题
            </MDBListGroupItem>
            <MDBListGroupItem
              hover
              href="/review/create"
              className="d-flex justify-content-center align-items-center"
              style={{color: '#454F69', borderLeftWidth: 0, borderRightWidth: 0}}>
              <MDBIcon fal icon="comments" className="mr-2"/> 写短评
            </MDBListGroupItem>
          </MDBListGroup>
        </MDBCol>
      </React.Fragment>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

SideBarReact.i18n = [
  {},
  {}
];

SideBarReact.propTypes = {
  // self
  answers:PropTypes.array.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

const SideBar = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(SideBarReact));

export default SideBar;
