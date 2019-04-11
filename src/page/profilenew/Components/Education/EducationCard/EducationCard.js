import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import classes from './EducationCard.module.css';
import schoolIcon from '../../../assets/schoolIcon.jpg';
import Dropdown from '../../Dropdown/Dropdown';
import { languageHelper } from '../../../../../tool/language-helper';

const translation = [
  {
    uName: '学校名称',
    begin: '开始日期',
    end: '结束日期',
    degree: '学位',
  },
  {
    uName: 'University',
    begin: 'Begin',
    end: 'End',
    degree: 'degree',
  },
];
const text = translation[languageHelper()];

class EducationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.data ? false : true, // eslint-disable-line
      educationData: this.props.data // eslint-disable-line
        ? {
          id: this.props.data.id,
            university_id: this.props.data.university_id, // eslint-disable-line
          major: this.props.data.major,
          degree: this.props.data.degree,
          duration: {
              begin: this.props.data.duration.begin, // eslint-disable-line
              end: this.props.data.duration.end, // eslint-disable-line
          },
            note: this.props.data.note, // eslint-disable-line
        }
        : {
          id: '',
          university_id: '',
          major: '',
          degree: '',
          duration: {
            begin: '',
            end: '',
          },
        },
      dateRange: [new Date(), new Date()],
    };
    this.uniRef = React.createRef();
    this.degreeRef = React.createRef();
  }

  // this method only toggle 'editing'
  editHandler = () => {
    this.setState({ editing: true });
  };

  // tell parent the id of the current card
  deleteHandler = () => {
    if (this.state.educationData.id) {
      this.props.deleteHandler(this.state.educationData.id); // eslint-disable-line
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
    if (this.state.educationData.id) {
      // console.log(`id to delete is ${this.state.proData.id}`);
      this.props.saveHandler(
        this.state.educationData,
        this.state.educationData.id,
        'update'
      );
    } else {
      this.props.saveHandler(this.state.educationData, null, 'add');
    }
  };

  inputOnChange = () => {
    this.setState({
      ...this.state,
      educationData: {
        ...this.state.educationData,
        university_id: this.uniRef.current.value,
        degree: this.degreeRef.current.value,
        duration: {
          begin: `${this.state.dateRange[0].getTime()}`,
          end: `${this.state.dateRange[1].getTime()}`,
        },
      },
    });
  };

  dateRangePickerOnChange = newDateRange => {
    this.setState({ ...this.state, dateRange: newDateRange }, () => {
      this.inputOnChange();
    });
  };

  render() {
    let toShow = (
      <div className={classes.EducationCard}>
        <img src={schoolIcon} alt="no img" />
        <div className={classes.SchoolInfo}>
          <input
            disabled
            type="text"
            value={this.state.educationData.university}
            onChange={this.inputOnChange}
          />
          <DateRangePicker
            onChange={this.dateRangePickerOnChange}
            value={this.state.dateRange}
            disabled={true}
          />
          <input
            disabled
            type="text"
            value={this.state.educationData.degree}
            onChange={this.inputOnChange}
          />
        </div>
        <Dropdown
          className={classes.Dropdown}
          delete={this.deleteHandler}
          edit={this.editHandler}
        />
      </div>
    );

    if (this.state.editing) {
      toShow = (
        <div className={classes.EducationCard}>
          <img src={schoolIcon} alt="no img" />
          <div className={classes.SchoolInfo}>
            <input
              type="text"
              value={this.state.educationData.university}
              ref={this.uniRef}
              placeholder={text.uName}
              onChange={this.inputOnChange}
            />
            <DateRangePicker
              onChange={this.dateRangePickerOnChange}
              value={this.state.dateRange}
            />
            <input
              type="text"
              value={this.state.educationData.degree}
              ref={this.degreeRef}
              placeholder={text.degree}
              onChange={this.inputOnChange}
            />
          </div>
          <Dropdown
            className={classes.Dropdown}
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

EducationCard.propTypes = {
  cancel: PropTypes.func,
  data: PropTypes.object,
  saveHandler: PropTypes.func.isRequired,
};

export default EducationCard;
