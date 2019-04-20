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

import {getAsync, isLogin} from '../../tool/api-helper';


class JobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = JobReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (!isLogin()) {
      this.setState({
        render: 2,
      });
    }
    this.setState({
      render: 1,
      backend: await getAsync(`/jobs/${this.props.match.params.id}`)
    });
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    switch (this.state.render) {
      case 1:
        return (
          <div className={classes.background}>
            <div className={classes.bg}>
              <img src={bg} alt="bg" className={classes.img} />
            </div>
            <div className="cell-wall">
              <div className="cell-membrane">
                <div className="d-flex">
                  <div>
                    <JobCard backend={this.state.backend} />
                    <JobDesci backend={this.state.backend} />
                    <KnowCompany backend={this.state.backend} />
                    <SimilarJob title={this.state.backend.content.name} />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (<Redirect to={`/login?to=${this.props.location.pathname}`} />);
      default:
        return null;
    }
  }
}

JobReact.i18n = [
  {},
  {}
];

JobReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,

  // React Router

  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Job = JobReact;
