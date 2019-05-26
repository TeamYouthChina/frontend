import React, {Component} from 'react';

import {Header} from '../../../../general-component/header/header';
import {ResumeTitle} from '../../../../general-component/resumeTitle';
import Index from '../..';
import classes from './ProfileHome.module.css';
import {getAsync} from '../../../../../tool/api-helper';

class ProfileHome extends Component {

  state = {
    requestID: null,
    requestedData: null
  }

  componentWillMount() {
    this.setState({requestID: this.props.match.params.id});      // eslint-disable-line
  }

  async componentDidMount() {
    // ideally only get /applicants/id/basicinfo
    let data = await getAsync('/applicants/' + this.state.requestID);
    this.setState({requestedData: data});
  }

  render() {
    let toShow =
      <div className={classes.ProfileHome}>
        <Header />
        <p>no such data</p>
      </div>;


    if (this.state.requestedData && this.state.requestedData.content && this.state.requestedData.status.code === 2000) {

      let dataForResumeTitle = {
        img: this.state.requestedData.content.avatarUrl,
        name: this.state.requestedData.content.name,
        description: null,
        work: this.state.requestedData.content.currentCompanyName,
        influence: null
      };

      toShow =

        <div className={classes.ProfileHome}>
          <Header />
          <ResumeTitle data={dataForResumeTitle} />
          <Index requestID={this.state.requestID} data={this.state.requestedData.content} />
        </div>;
    }
    return (
      toShow
    );
  }
}

export default ProfileHome;
