import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {JobForYouWrapper} from '../../wrapper';
import {CollectionCard} from '../../component/collectionCard';
import {TagSidebar} from '../../component/tag';
import {FilterRow} from '../../component/filter';
import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';
import {MDBRow, MDBCol} from 'mdbreact';
import classes from '../index.module.css';

class GeneralReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = GeneralReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div
          className="cell-wall"
          style={{backgroundColor: '#F3F5F7'}}
        >
          <div
            className="cell-membrane"
          >
            <MDBRow style={{marginTop: '2vw'}}>
              <MDBCol className="px-0" size="10">
                <FilterRow number={10} />
                <JobForYouWrapper />
              </MDBCol>
              <MDBCol className={classes.sidebar} size="2">
                <CollectionCard number={76} />
                <TagSidebar tags={['面试经历', '删库经历', '跑路经历']} />
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      </div>
    );
  }
}

GeneralReact.i18n = [
  {},
  {}
];

GeneralReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const General = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(GeneralReact);
