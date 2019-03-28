import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import bg from './bg.png';

import classes from './index.module.css';
import {content} from './index.mock';
import {KnowCompany} from './know-company';
import {JobCard} from './job-card';
import {JobDesci} from './job-descri';
import {SimilarJob} from './similar-job';

import {mockGetAsync} from '../../tool/api-helper';


class JobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: {
        content:{
          id: null,
          name: null,
          organization:{
            id:null,
            name:null,
            avatarUrl: null,
            location: null,
            note: null
          },

          location: null,
          range:null,
          salary:null,
          worktime:null,
          type:null,
          job_description:
            null,
          job_duty:
            null,
        },
        status: {
          code: null,
          reason: null,
        },
      },
    };
    // i18n
    this.text = JobReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    // const requestedData = await getAsync();
    // this.setState({ cardData: requestedData, ...this.state });

    const requestedData = await mockGetAsync(content);
    this.setState({ ...this.state, backend: requestedData});
  }
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div className={classes.background}>
        <div className={classes.bg}>
          <img src={bg} alt="bg" className={classes.img}/>
        </div>
        <div className="cell-wall">
          <div className="cell-membrane">
            <div className="d-flex">
              <div>
                <JobCard backend={this.state.backend}/>
                <JobDesci backend={this.state.backend}/>
                <KnowCompany backend={this.state.backend}/>
                <SimilarJob backend={this.state.backend}/>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

JobReact.i18n = [
  {},
  {}
];

JobReact.propTypes = {
  // self

  // React Router
  backend: PropTypes.object.isRequired,

  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Job = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(JobReact);
