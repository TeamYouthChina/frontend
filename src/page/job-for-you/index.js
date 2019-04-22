import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {JobForYouWrapper} from './wrapper';
import {CollectionCard} from './component/collectionCard';
// import {TagSidebar} from '../../component/tag';
import {FilterRow} from './component/filter';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {MDBCol, MDBRow} from 'mdbreact';
import classes from './index.module.css';
import {getAsync, isLogin} from '../../tool/api-helper';

class JobForYouReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      collectionNum: 0,
      collectionType: 'company'
    };
    // i18n
    this.text = JobForYouReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if(isLogin()){
      try {
        const result = await getAsync(`/users/${localStorage.getItem('id')}/attentions?type=${this.state.collectionType}`);
        if (result && result.status && result.status.code === 2000) {
          this.setState(() => {
            return {collectionNum: result.content.company.item_count};
          });
        } else {
          this.setState(() => {
            return {collectionNum: 0};
          });
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    }
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    if (!isLogin()) {
      return (<Redirect to={`/login?to=${this.props.location.pathname}`} />);
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
                <FilterRow number={25} />
                <JobForYouWrapper />
              </MDBCol>
              <MDBCol className={classes.sidebar} size="2">
                <CollectionCard number={this.state.collectionNum} url={'job'} collectionType={'职位'}/>
                {/*<TagSidebar tags={['面试经历', '删库经历', '跑路经历']} />*/}
              </MDBCol>
            </MDBRow>
          </div>
        </div>
      </div>
    );
  }
}

JobForYouReact.i18n = [
  {},
  {}
];

JobForYouReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const JobForYou = JobForYouReact;
