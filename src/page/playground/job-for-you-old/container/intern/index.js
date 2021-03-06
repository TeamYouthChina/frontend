import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {JobForYouWrapper} from '../../wrapper';
import {CollectionCard} from '../../component/collectionCard';
// import {TagSidebar} from '../../component/tag';
import {FilterRow} from '../../component/filter';
import {languageHelper} from '../../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../../tool/remove-url-slash-suffix';
import {MDBRow, MDBCol} from 'mdbreact';
import classes from '../index.module.css';

class InternReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = InternReact.i18n[languageHelper()];
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
                <FilterRow number={55} />
                <JobForYouWrapper />
              </MDBCol>
              <MDBCol className={classes.sidebar} size="2">
                <CollectionCard number={21} />
                {/*<TagSidebar tags={['面试经历', '删库经历', '跑路经历']} />*/}
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      </div>
    );
  }
}

InternReact.i18n = [
  {},
  {}
];

InternReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Intern = InternReact;
