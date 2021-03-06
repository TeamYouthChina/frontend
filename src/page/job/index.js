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

import {get, getAsync, isLogin} from '../../tool/api-helper';


class JobReact extends React.Component {
  
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
      backend:'',
      app:''
    };
    // i18n
    this.text = JobReact.i18n[languageHelper()];
    this.appList=[];
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // fix the bug of React Router
    if (nextProps.match.params.id !== this.props.match.params.id) {
      if (!isLogin()) {
        this.setState({
          render: 2,
        });
        return;
      }
      this.setState({
        render: 0
      });
      get(`/jobs/${nextProps.match.params.id}`).then((data) => {
        this.setState({
          render: 1,
          backend: data
        });
      });
    }
  }


  async componentDidMount() {
    if (!isLogin()) {
      this.setState({
        render: 2,
      });
      return;
    }
    const app=await getAsync(`/applicants/${localStorage.getItem('id')}/applications`);
    const backend=await getAsync(`/jobs/${this.props.match.params.id}`);
    for(let i=0;i<app.content.data.length;i++){
      this.appList.push(app.content.data[i].id);
    }
    this.setState({
      render:1,
      backend: backend,
      app: this.appList,
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
                    <JobCard backend={this.state.backend} appList={this.state.app}/>
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
  id: PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Job = JobReact;
