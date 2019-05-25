import React, {Component} from 'react';

import classes from './SocialActivityCard.module.css';
import socialActivityIcon from '../../../assets/activity-icon.png';
import Dropdown from '../../Dropdown/Dropdown';
import {languageHelper} from '../../../../../../tool/language-helper';

const translation = [
  {
    name: '名称',
    organization: '机构',
    begin: '开始日期',
    end: '结束日期',
    note: '说明',
  },
  {
    name: 'Name',
    organization: 'Organization',
    begin: 'Begin',
    end: 'End',
    note: 'Note',
  },
];
const text = translation[languageHelper()];

class SocialActivityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: !this.props.data,      // eslint-disable-line
      socialData: this.props.data      // eslint-disable-line
        ? {
          name: this.props.data.name,      // eslint-disable-line
          organization: this.props.data.organization,      // eslint-disable-line
          duration: {
            begin: this.props.data.duration.begin.substring(0, 10),      // eslint-disable-line
            end: this.props.data.duration.end.substring(0, 10),      // eslint-disable-line
          },
          note: this.props.data.note,      // eslint-disable-line
        }
        : {
          name: '',
          organization: '',
          duration: {
            begin: '',
            end: '',
          },
          note: '',
        },
    };
    this.nameRef = React.createRef();
    this.orgRef = React.createRef();
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

  saveHandler = () => {
    this.setState({
      ...this.state,
      editing: false,
    });
    this.props.saveHandler(this.state.socialData, this.props.id);      // eslint-disable-line
  };

  inputOnChange = () => {
    this.setState({
      ...this.state,
      socialData: {
        name: this.nameRef.current.value,
        organization: this.orgRef.current.value,
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
      <div className={classes.SocialActivityCard}>
        <img src={socialActivityIcon} alt="no img" />
        <div className={classes.ActivityInfo}>
          <input
            disabled
            type="text"
            value={this.state.socialData.name}
            onChange={this.inputOnChange}
          />
          <input
            disabled
            type="text"
            value={this.state.socialData.organization}
            onChange={this.inputOnChange}
          />
          <div className={classes.twoP}>
            <p>
              {this.state.socialData.duration.begin} -{' '}
              {this.state.socialData.duration.end}
            </p>
          </div>
          <input
            style={{margin: '15px 0px 3px 0px'}}
            disabled
            type="text"
            value={this.state.socialData.note ? this.state.socialData.note : ''}
            onChange={this.inputOnChange}
          />
        </div>
        <Dropdown delete={this.deleteHandler} edit={this.editHandler} />
      </div>
    );

    if (this.state.editing) {
      toShow = (
        <div className={classes.SocialActivityCard}>
          <img src={socialActivityIcon} alt="no img" />
          <div className={classes.ActivityInfo}>
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.socialData.name}
              ref={this.nameRef}
              placeholder={text.name}
              onChange={this.inputOnChange}
            />
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.socialData.organization}
              ref={this.orgRef}
              placeholder={text.organization}
              onChange={this.inputOnChange}
            />
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.socialData.duration.begin}
              ref={this.beginRef}
              placeholder={text.begin}
              onChange={this.inputOnChange}
            />
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.socialData.duration.end}
              ref={this.endRef}
              placeholder={text.end}
              onChange={this.inputOnChange}
            />
            <input
              style={{margin: '3px 0px'}}
              type="text"
              value={this.state.socialData.note}
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

export default SocialActivityCard;
