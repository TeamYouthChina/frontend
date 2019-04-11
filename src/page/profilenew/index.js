import React, {Component} from 'react';
import classes from './index.module.css';
// import ResumeButtons from './Components/ResumeButtons/ResumeButtons';
// import BasicInfo from './Components/BasicInfo/BasicInfo';
import Education from './Components/Education/Education'; // eslint-disable-line
import WorkExperience from './Components/WorkExperience/WorkExperience'; // eslint-disable-line
import Certifications from './Components/Certification/Certification'; // eslint-disable-line
import SocialActivicies from './Components/SocialActivity/SocialActivity'; // eslint-disable-line
// import Projects from './Components/Project/Project';
import Skills from './Components/Skill/Skill'; // eslint-disable-line
import AdvantageTag from './Components/advantageTag/'; // eslint-disable-line
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// import {getAsync} from '../../tool/api-helper';

class ProfileMainBodyReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestID: this.props.requestID,       // eslint-disable-line
    };
  }

  componentWillMount() {
    // this.setState({requestID: this.props.match.params.id});
  }

  async componentDidMount() {
    // console.log('parent componentDidMout');
    // using mock if no second argument
    // let data = await getAsync("/applicants/" + this.state.requestID, true);
    // console.log(data);
    // this.setState({ requestedData: data });
  }

  render() {
    let toShow = (
      <div>
        <p>no such data</p>
      </div>
    );

    // let dataForBasicInfo = null;
    // if (
    //   this.state.requestedData &&
    //   this.state.requestedData.content &&
    //   this.state.requestedData.status.code === 2000
    // ) {
    //   dataForBasicInfo = {
    //     name: this.state.requestedData.content.name
    //       ? this.state.requestedData.content.name
    //       : "no name given",
    //     DOB: this.state.requestedData.content.DOB
    //       ? this.state.requestedData.content.DOB
    //       : "no DOB given",
    //     gender: this.state.requestedData.content.gender
    //       ? this.state.requestedData.content.gender
    //       : "no gender given",
    //     email: this.state.requestedData.content.contacts.email
    //       ? this.state.requestedData.content.contacts.email
    //       : "no email given",
    //     phone: this.state.requestedData.content.contacts.phonenumbers
    //       ? this.state.requestedData.content.contacts.phonenumbers
    //       : "no phone given",
    //   };

    //   toShow = (
    //     <div className={classes.Index}>
    //       {/* <ResumeButtons/> */}
    //       <BasicInfo data={dataForBasicInfo} />
    //       <Education requestID={this.state.requestID} />
    //       <WorkExperience requestID={this.state.requestID} />
    //       <Certifications requestID={this.state.requestID} />
    //       <SocialActivicies requestID={this.state.requestID} />
    //       <Projects requestID={this.state.requestID} />
    //       <Skills requestID={this.state.requestID} />
    //     </div>
    //   );
    // }

    toShow = (
      <div className="cell-wall" style={{backgroundColor: '#F3F5F7'}}>
        <div className="cell-membrane">
          <div className={classes.MainBody}>
            {/* <Projects requestID={this.state.requestID} /> */}
            <Education requestID={this.state.requestID} />
            <WorkExperience requestID={this.state.requestID} />
            {/* <Skills requestID={this.state.requestID} />
            <Certifications requestID={this.state.requestID} />
            <SocialActivicies requestID={this.state.requestID} /> */}
            {/* <AdvantageTag requestID={this.state.requestID}/> */}
          </div>
        </div>
      </div>
    );
    return toShow;
  }
}

ProfileMainBodyReact.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const ProfileMainBody = withRouter(ProfileMainBodyReact);
