import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { MDBInput } from 'mdbreact';

import classes from './WorkExperienceCard.module.css';
import workIcon from '../../../assets/google.jpg';
import Dropdown from '../../Dropdown/Dropdown';
import { languageHelper } from '../../../../../tool/language-helper';

const translation = [
  {
    position: '职位',
    employer: '雇主',
    begin: '开始日期',
    end: '结束日期',
    note: '说明',
  },
  {
    position: 'Position',
    employer: 'Employer',
    begin: 'Begin',
    end: 'End',
    note: 'Note',
  },
];
const text = translation[languageHelper()];

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
              nation_code: this.props.data.location ?  this.props.data.location.nation_code : '',
              location_code: this.props.data.location ? this.props.data.location.location_code : '000000',
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
      dateRange: [new Date(), new Date()],
    };

    this.posRef = React.createRef();
    this.employerRef = React.createRef();
    this.noteRef = React.createRef();
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
    this.setState({
      ...this.state,
      editing: false,
    });
    if (this.state.workData.id) {
      // console.log(`id to delete is ${this.state.proData.id}`);
      this.props.saveHandler(
        this.state.workData,
        this.state.workData.id,
        'update'
      );
    } else {
      this.props.saveHandler(this.state.workData, null, 'add');
    }
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

  render() {
    // console.log(this.state.workData)
    let toShow;
    if (!this.state.editing) {
      toShow = (
        <div className={classes.WorkExperienceCard}>
          <img src={workIcon} alt='no img' />
          <div className={classes.WorkInfo}>
            <p>{this.state.workData.employer}</p>
            <p>{this.state.workData.position}</p>
            <p>
              {`${this.state.workData.duration.begin.toLocaleDateString(
                'zh-cn',
                {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }
              )}    ${this.state.workData.duration.end.toLocaleDateString(
                'zh-cn',
                {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }
              )}`}
            </p>
            <p>
              {`${this.state.workData.location.nation_code}    ${
                this.state.workData.location.location_code
              }`}
            </p>
            {/* <p>{this.state.workData.note}</p> */}
          </div>
          <Dropdown delete={this.deleteHandler} edit={this.editHandler} />
        </div>
      );
    } else {
      toShow = (
        <div className={classes.WorkExperienceCard}>
          <img src={workIcon} alt='no img' />
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
