import React, {Component} from 'react';

import classes from './CertificationCard.module.css';
import certificationIcon from '../../../assets/coursera.png';
import Dropdown from '../../Dropdown/Dropdown';
import {languageHelper} from '../../../../../tool/language-helper';

const translation = [
  {
    name: '名称',
    auth: '机构',
    begin: '开始日期',
    end: '结束日期',
    note: '说明',
  },
  {
    name: 'Name',
    auth: 'Organization',
    begin: 'Begin',
    end: 'End',
    note: 'Note',
  },
];
const text = translation[languageHelper()];

class CertificationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.data ? false : true,      // eslint-disable-line
      certiData: this.props.data      // eslint-disable-line
        ? {
          name: this.props.data.name,      // eslint-disable-line
          authority: this.props.data.authority,      // eslint-disable-line
          duration: {
            begin: this.props.data.duration.begin.substring(0, 10),      // eslint-disable-line
            end: this.props.data.duration.end.substring(0, 10),      // eslint-disable-line
          },
          note: this.props.data.note,      // eslint-disable-line
        }
        : {
          name: '',
          authority: '',
          duration: {
            begin: '',
            end: '',
          },
          note: '',
        },
    };
    this.nameRef = React.createRef();
    this.authRef = React.createRef();
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
    this.props.saveHandler(this.state.certiData, this.props.id);      // eslint-disable-line
  };

  inputOnChange = () => {
    this.setState({
      ...this.state,
      certiData: {
        name: this.nameRef.current.value,
        authority: this.authRef.current.value,
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
      <div className={classes.CertificationCard}>
        <img src={certificationIcon} alt="no img" />
        <div className={classes.certifiInfo}>
          <input
            disabled
            type="text"
            value={this.state.certiData.name}
          />
          <input
            disabled
            type="text"
            value={this.state.certiData.authority}
          />
          <div className={classes.twoP}>
            <p>
              {this.state.certiData.duration.begin} -{' '}
              {this.state.certiData.duration.end}
            </p>
          </div>
          <input
            style={{margin: '15px 0px 3px 0px'}}
            disabled
            type="text"
            value={this.state.certiData.note ? this.state.certiData.note : ''}
          />
        </div>
        <Dropdown delete={this.deleteHandler} edit={this.editHandler} />
      </div>
    );

    if (this.state.editing) {
      toShow = (
        <div className={classes.CertificationCard}>
          <img src={certificationIcon} alt="no img" />
          <div className={classes.certifiInfo}>
            <input
              type="text"
              value={this.state.certiData.name}
              ref={this.nameRef}
              placeholder={text.name}
              onChange={this.inputOnChange}
            />
            <input
              type="text"
              value={this.state.certiData.authority}
              ref={this.authRef}
              placeholder={text.authority}
              onChange={this.inputOnChange}
            />
            <input
              type="text"
              value={this.state.certiData.duration.begin}
              ref={this.beginRef}
              placeholder={text.begin}
              onChange={this.inputOnChange}
            />
            <input
              type="text"
              value={this.state.certiData.duration.end}
              ref={this.endRef}
              placeholder={text.end}
              onChange={this.inputOnChange}
            />
            <input
              type="text"
              value={this.state.certiData.note}
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

export default CertificationCard;
