import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { MDBInput } from 'mdbreact';

import classes from './WorkExperienceCard.module.css';
import Dropdown from '../../Dropdown/Dropdown';
import { Location } from './location/index';
// import { languageHelper } from '../../../../../tool/language-helper';

// const translation = [
//   {
//     position: '职位',
//     employer: '雇主',
//     begin: '开始日期',
//     end: '结束日期',
//     note: '说明',
//   },
//   {
//     position: 'Position',
//     employer: 'Employer',
//     begin: 'Begin',
//     end: 'End',
//     note: 'Note',
//   },
// ];
// const text = translation[languageHelper()];

class WorkExperienceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.data ? false : true, // eslint-disable-line
      workData: this.props.data // eslint-disable-line
        ? {
          id: this.props.data.id,
            employer: this.props.data.employer, // eslint-disable-line
            position: this.props.data.position, // eslint-disable-line
          duration: {
              begin: new Date(this.props.data.duration.begin), // eslint-disable-line
              end: new Date(this.props.data.duration.end), // eslint-disable-line
          },
          location: {
            nation_code: '',
            location_code: this.props.data.location
              ? this.props.data.location
              : '000000',
          },
            note: this.props.data.note ? this.props.data.note : '无简介', // eslint-disable-line
        }
        : {
          id: '',
          employer: '',
          position: '',
          duration: {
            begin: new Date(),
            end: new Date(),
          },
          location: {
            nation_code: '',
            location_code: '',
          },
          note: '',
        },
      dateRange: this.props.data ? [new Date(this.props.data.duration.begin), new Date(this.props.data.duration.begin)] : [new Date(), new Date()],
    };
  }

  // this method only toggle 'editing'
  editHandler = () => {
    this.setState({ editing: true });
  };

  // tell parent the id of the current card
  deleteHandler = () => {
    if (this.state.workData.id) {
      this.props.deleteHandler(this.state.workData.id); // eslint-disable-line
    } else {
      this.props.cancel();
    }
  };

  // packup new data for this card and send to parent
  saveHandler = () => {
    // console.log(this.state.workData);
    if (!this.state.workData.employer || !this.state.workData.position) {
      alert('请补全信息！');
      return;
    }
    if (this.state.workData.id) {
      // console.log(`id to delete is ${this.state.proData.id}`);
      this.props.saveHandler(
        {...this.state.workData},
        this.state.workData.id,
        'update'
      );
    } else {
      this.props.saveHandler({...this.state.workData}, null, 'add');
    }
    this.setState({
      ...this.state,
      editing: false,
    });
  };

  employerOnChange = value => {
    this.setState({
      ...this.state,
      workData: {
        ...this.state.workData,
        employer: value,
      },
    });
  };

  positionOnChange = value => {
    this.setState({
      ...this.state,
      workData: {
        ...this.state.workData,
        position: value,
      },
    });
  };

  noteOnChange = value => {
    this.setState({
      ...this.state,
      workData: {
        ...this.state.workData,
        note: value,
      },
    });
  };

  dateRangePickerOnChange = newDateRange => {
    this.setState({
      ...this.state,
      dateRange: newDateRange ? newDateRange : [new Date(), new Date()],
      workData: {
        ...this.state.workData,
        duration: {
          begin: newDateRange ? newDateRange[0] : new Date(),
          end: newDateRange ? newDateRange[1] : new Date(),
        },
      },
    });
  };

  onLocationChange = location => {
    this.setState({
      ...this.state,
      workData: {
        ...this.state.workData,
        location: {
          nation_code: location.countryCode,
          location_code: location.code,
        },
      },
    });
  };

  render() {
    // console.log('card render');
    let toShow;
    if (!this.state.editing) {
      toShow = (
        <div className={classes.WorkExperienceCard}>
          <img
            src='http://frontendpic.oss-us-east-1.aliyuncs.com/%E5%B7%A5%E4%BD%9C%E7%BB%8F%E5%8E%86.png'
            alt='no img'
          />
          <div className={classes.WorkInfo}>
            <p className={classes.Position}>{this.state.workData.position}</p>
            <p className={classes.Employer}>{this.state.workData.employer}</p>
            <p className={classes.TimeLocation}>
              {`${this.state.workData.duration.begin.toLocaleDateString(
                {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }
              )}\t${this.state.workData.duration.end.toLocaleDateString(
                {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }
              )}`}
            </p>
            <Location
              className={classes.Location}
              code={
                this.state.workData.location.location_code
                  ? this.state.workData.location.location_code
                  : '000000'
              }
              locate={this.onLocationChange}
              edit={false}
            />
            {/* <p>{this.state.workData.note}</p> */}
          </div>
          <Dropdown delete={this.deleteHandler} edit={this.editHandler} />
        </div>
      );
    } else {
      toShow = (
        <div className={classes.WorkExperienceCard}>
          <img
            src='http://frontendpic.oss-us-east-1.aliyuncs.com/%E5%B7%A5%E4%BD%9C%E7%BB%8F%E5%8E%86.png'
            alt='no img'
          />
          <div className={classes.WorkInfo}>
            <MDBInput
              label='公司'
              getValue={this.employerOnChange}
              value={
                this.state.workData.employer ? this.state.workData.employer : ''
              }
            />
            <MDBInput
              label='职位'
              getValue={this.positionOnChange}
              value={
                this.state.workData.position ? this.state.workData.position : ''
              }
            />
            {/* put loction here */}
            <DateRangePicker
              onChange={this.dateRangePickerOnChange}
              value={this.state.dateRange}
            />
            <Location
              code={
                this.state.workData.location.location_code
                  ? this.state.workData.location.location_code
                  : '000000'
              }
              locate={this.onLocationChange}
              edit={true}
            />
            {/* <MDBInput
              label='简介'
              getValue={this.noteOnChange}
              value={
                this.state.workData.note ? this.state.workData.note : ''
              }
            /> */}
          </div>
          <Dropdown
            delete={this.deleteHandler}
            edit={this.editHandler}
            editing
            save={this.saveHandler}
          />
        </div>
      );
    }

    return toShow;
  }
}

WorkExperienceCard.propTypes = {
  cancel: PropTypes.func,
  data: PropTypes.object,
  saveHandler: PropTypes.func.isRequired,
};

export default WorkExperienceCard;
