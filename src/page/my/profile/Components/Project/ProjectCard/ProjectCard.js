import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './ProjectCard.module.css';
import Dropdown from '../../Dropdown/Dropdown';
import { languageHelper } from '../../../../../../tool/language-helper';

const translation = [
  {
    name: '名称',
    begin: '开始日期',
    end: '结束日期',
    note: '说明',
  },
  {
    name: 'Name',
    begin: 'Begin',
    end: 'End',
    note: 'Note',
  },
];
const text = translation[languageHelper()];

class projectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.data ? false : true, // eslint-disable-line
      proData: this.props.data // eslint-disable-line
        ? {
            id: this.props.data.id, // eslint-disable-line
            name: this.props.data.name, // eslint-disable-line
            role: this.props.data.role, // eslint-disable-line
          duration: {
              begin: this.props.data.duration.begin.substring(0, 10), // eslint-disable-line
              end: this.props.data.duration.end.substring(0, 10), // eslint-disable-line
          },
            note: this.props.data.note, // eslint-disable-line
        }
        : {
          id: '',
          name: '',
          role: '',
          duration: {
            begin: '',
            end: '',
          },
          note: '',
        },
    };
    this.nameRef = React.createRef();
    this.beginRef = React.createRef();
    this.endRef = React.createRef();
    this.noteRef = React.createRef();
  }

  // this method only toggle 'editing'
  editHandler = () => {
    this.setState({ editing: true });
  };

  // tell parent the id of the current card
  deleteHandler = () => {
    if (this.state.proData.id) {
      this.props.deleteHandler(this.state.proData.id); // eslint-disable-line
    } else {
      this.props.cancel();
    }
  };

  saveHandler = () => {
    this.setState({
      ...this.state,
      editing: false,
    });
    if (this.state.proData.id) {
      // console.log(`id to delete is ${this.state.proData.id}`);
      this.props.saveHandler(
        this.state.proData,
        this.state.proData.id,
        'update'
      ); // eslint-disable-line
    } else {
      this.props.saveHandler(this.state.proData, null, "add"); // eslint-disable-line
    }
  };

  inputOnChange = () => {
    this.setState({
      ...this.state,
      proData: {
        ...this.state.proData,
        name: this.nameRef.current.value,
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
      <div className={classes.ProjectCard}>
        <input
          disabled
          type="text"
          value={this.state.proData.name ? this.state.proData.name : ''}
        />
        <div className={classes.twoP}>
          <p>
            {this.state.proData.duration.begin} -{' '}
            {this.state.proData.duration.end}
          </p>
        </div>
        <input
          style={{ margin: '15px 0px 3px 0px' }}
          disabled
          type="text"
          value={this.state.proData.note ? this.state.proData.note : ''}
        />
        <Dropdown delete={this.deleteHandler} edit={this.editHandler} />
      </div>
    );

    if (this.state.editing) {
      toShow = (
        <div className={classes.ProjectCard}>
          <input
            type="text"
            value={this.state.proData.name ? this.state.proData.name : ''}
            ref={this.nameRef}
            placeholder={text.name}
            onChange={this.inputOnChange}
          />
          <input
            type="text"
            value={
              this.state.proData.duration.begin
                ? this.state.proData.duration.begin
                : ''
            }
            ref={this.beginRef}
            placeholder={text.begin}
            onChange={this.inputOnChange}
          />
          <input
            type="text"
            value={
              this.state.proData.duration.end
                ? this.state.proData.duration.end
                : ''
            }
            ref={this.endRef}
            placeholder={text.end}
            onChange={this.inputOnChange}
          />
          <input
            type="text"
            value={this.state.proData.note ? this.state.proData.note : ''}
            ref={this.noteRef}
            placeholder={text.note}
            onChange={this.inputOnChange}
          />
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

projectCard.propTypes = {
  cancel: PropTypes.func,
  data: PropTypes.object.isRequired,
  saveHandler: PropTypes.func.isRequired,
};

export default projectCard;
