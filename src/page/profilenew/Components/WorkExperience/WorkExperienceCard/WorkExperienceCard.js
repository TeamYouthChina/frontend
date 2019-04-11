import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

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
              begin: this.props.data.duration.begin, // eslint-disable-line
              end: this.props.data.duration.end // eslint-disable-line
          },
          location: {
            nation_code: this.props.data.location.nation_code,
            location_code: this.props.data.location.location_code
          },
            note: this.props.data.note, // eslint-disable-line
        }
        : {
          id:'',
          employer: '',
          position: '',
          duration: {
            begin: '',
            end: '',
          },
          location: {
            nation_code: '',
            location_code: ''
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
      ); // eslint-disable-line
    } else {
      this.props.saveHandler(this.state.workData, null, "add"); // eslint-disable-line
    }
  };

  inputOnChange = () => {
    this.setState({
      ...this.state,
      workData: {
        ...this.state.workData,
        position: this.posRef.current.value,
        employer: this.employerRef.current.value,
        duration: {
          begin: `${this.state.dateRange[0].getTime()}`,
          end: `${this.state.dateRange[1].getTime()}`,
        },
        note: this.noteRef.current.value,
      },
    });
  };

  dateRangePickerOnChange = newDateRange => {
    this.setState({ ...this.state, dateRange: newDateRange }, () => {
      this.inputOnChange();
    });
  };

  render() {
    let toShow;
    if (!this.state.editing) {
      toShow = (
        <div className={classes.WorkExperienceCard}>
          <img src={workIcon} alt="no img" />
          <div className={classes.WorkInfo}>
            <input
              disabled
              style={{ fontSize: '1.25vw', fontWeight: '500' }}
              type="text"
              value={
                this.state.workData.position ? this.state.workData.position : ''
              }
              ref={this.posRef}
              placeholder={text.position}
              onChange={this.inputOnChange}
            />
            <input
              disabled
              style={{ fontSize: '1.25vw' }}
              type="text"
              value={
                this.state.workData.employer
                  ? this.state.workData.exmployer
                  : ''
              }
              ref={this.employerRef}
              placeholder={text.employer}
              onChange={this.inputOnChange}
            />
            <div className={classes.twoP}>
              <DateRangePicker
                onChange={this.dateRangePickerOnChange}
                value={this.state.dateRange}
                disabled={true}
              />
            </div>

            <textarea
              disabled
              className={classes.description}
              value={this.state.workData.note ? this.state.workData.note : ''}
              ref={this.noteRef}
              placeholder={text.note}
              onChange={this.inputOnChange}
            />
          </div>
          <Dropdown delete={this.deleteHandler} edit={this.editHandler} />
        </div>
      );
    } else {
      toShow = (
        <div className={classes.WorkExperienceCard}>
          <img src={workIcon} alt="no img" />
          <div className={classes.WorkInfo}>
            <input
              style={{ margin: '3px 0px' }}
              type="text"
              value={
                this.state.workData.position ? this.state.workData.position : ''
              }
              ref={this.posRef}
              placeholder={text.position}
              onChange={this.inputOnChange}
            />
            <input
              style={{ margin: '3px 0px' }}
              type="text"
              value={
                this.state.workData.employer ? this.state.workData.employer : ''
              }
              ref={this.employerRef}
              placeholder={text.employer}
              onChange={this.inputOnChange}
            />
            <div className={classes.twoP}>
              <DateRangePicker
                onChange={this.dateRangePickerOnChange}
                value={this.state.dateRange}
              />
            </div>

            <input
              style={{ margin: '3px 0px' }}
              type="text"
              value={this.state.workData.note ? this.state.workData.note : ''}
              ref={this.noteRef}
              placeholder={text.note}
              onChange={this.inputOnChange}
            />
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
