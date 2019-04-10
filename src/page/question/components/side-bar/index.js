import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from 'react-router-dom';

import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';

import {MDBCol} from 'mdbreact';

import GroupList from './group-list';
import Related from './related';

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
        <MDBCol style={{width:'15.39vw',marginLeft:'1.56vw',padding:'0'}}>
          <GroupList />
          <Related related={[1,2,3]}/>
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
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const SideBar = withRouter(SideBarReact);

export default SideBar;
