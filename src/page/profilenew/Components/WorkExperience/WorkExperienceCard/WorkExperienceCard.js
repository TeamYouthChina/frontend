import React, {Component} from 'react';

import classes from './WorkExperienceCard.module.css';
import workIcon from '../../../assets/google.jpg';
import Dropdown from '../../Dropdown/Dropdown';
import {languageHelper} from '../../../../../tool/language-helper';

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
      editing: this.props.data ? false : true,      // eslint-disable-line
      workData: this.props.data      // eslint-disable-line
        ? {
          position: this.props.data.position,      // eslint-disable-line
          employer: this.props.data.employer,      // eslint-disable-line
          duration: {
            begin: this.props.data.duration.begin.substring(0, 10),      // eslint-disable-line
            end: this.props.data.duration.end.substring(0, 10),      // eslint-disable-line
          },
          note: this.props.data.note,      // eslint-disable-line
        }
        : {
          position: '',
          employer: '',
          duration: {
            begin: '',
            end: '',
          },
          note: '',
        },
    };

    this.posRef = React.createRef();
    this.employerRef = React.createRef();
    this.beginRef = React.createRef();
    this.endRef = React.createRef();
    this.noteRef = React.createRef();
  }

  // this method only toggle 'editing'
  editHandler = () => {
    this.setState({editing: true});
  };

  // tell parent the id of the current card
  deleteHandler = () => {
    this.props.deleteHandler(this.props.id);      // eslint-disable-line
  };

  // packup new data for this card and send to parent
  saveHandler = () => {
    this.setState({
      ...this.state,
      editing: false,
    });
    this.props.saveHandler(this.state.workData, this.props.id);      // eslint-disable-line
  };

  inputOnChange = () => {
    this.setState({
      ...this.state,
      workData: {
        position: this.posRef.current.value,
        employer: this.employerRef.current.value,
        duration: {
          begin: this.beginRef.current.value,
          end: this.endRef.current.value,
        },
        note: this.noteRef.current.value,
      },
    });
  };

  render() {
    let toShow = (
      <div className={classes.WorkExperienceCard}>
        <img src={workIcon} alt="no img" />
        <div className={classes.WorkInfo}>
          <input
            disabled
            type="text"
            value={this.state.workData.position}
            ref={this.posRef}
            placeholder={text.position}
            onChange={this.inputOnChange}
          />
          <input
            disabled
            type="text"
            value={this.state.workData.employer}
            ref={this.employerRef}
            placeholder={text.employer}
            onChange={this.inputOnChange}
          />
          <div className={classes.twoP}>
            <p>
              {this.state.workData.duration.begin} -{' '}
              {this.state.workData.duration.end}
            </p>
          </div>
          <input
            style={{margin: '15px 0px 3px 0px'}}
            disabled
            type="text"
            value={this.state.workData.note ? this.state.workData.note : ''}
            ref={this.noteRef}
            placeholder={text.note}
            onChange={this.inputOnChange}
          />
        </div>
        <Dropdown delete={this.deleteHandler} edit={this.editHandler} />
      </div>
    );

    if (this.state.editing) {
      toShow = (
        <div className={classes.WorkExperienceCard}>
          <img src={workIcon} alt="no img" />
          <div className={classes.WorkInfo}>
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.workData.position}
              ref={this.posRef}
              placeholder={text.position}
              onChange={this.inputOnChange}
            />
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.workData.employer}
              ref={this.employerRef}
              placeholder={text.employer}
              onChange={this.inputOnChange}
            />
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.workData.duration.begin}
              ref={this.beginRef}
              placeholder={text.begin}
              onChange={this.inputOnChange}
            />
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.workData.duration.end}
              ref={this.endRef}
              placeholder={text.end}
              onChange={this.inputOnChange}
            />
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.workData.note}
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

export default WorkExperienceCard;
