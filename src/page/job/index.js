import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import bg from './bg.png';

import classes from './index.module.css';

import {KnowCompany} from './know-company';
import {JobCard} from './job-card';
import {JobDesci} from './job-descri';
import {SimilarJob} from './similar-job';

import {getAsync,} from '../../tool/api-helper';


class JobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
    };
    // i18n
    this.text = JobReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    if (this.props.id) {
      this.setState({
        backend: await getAsync(`/jobs/${this.props.id}`)
      });
    } else {
      this.setState({
        backend: await getAsync('/jobs/1')
      });
    }
  }
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ? (
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
    ):null;
  }
}

JobReact.i18n = [
  {},
  {}
];

JobReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  id:PropTypes.number.isRequired,

  // React Router
  location: PropTypes.object.isRequired
};

export const Job = JobReact;
