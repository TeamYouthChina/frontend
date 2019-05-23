import React, {Component} from 'react';
import {
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
} from 'mdbreact';

import classes from './SkillCard.module.css';
import SkillIcon from '../../../assets/javascript.png';
import Dropdown from '../../Dropdown/Dropdown';
import {languageHelper} from '../../../../../../tool/language-helper';

const translation = [
  {
    name: '名称',
  },
  {
    name: 'Name',
  },
];
const text = translation[languageHelper()];      // eslint-disable-line

class skillCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.data ? false : true,      // eslint-disable-line
      skillData: this.props.data      // eslint-disable-line
        ? {
          name: this.props.data,      // eslint-disable-line
        }
        : {
          name: '',
        },
    };
    this.nameRef = React.createRef();
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
    this.props.saveHandler(this.state.skillData, this.props.id);      // eslint-disable-line
  };

  inputOnChange = () => {
    this.setState({
      ...this.state,
      skillData: {
        name: this.nameRef.current.value,
      },
    });
  };

  render() {
    let toShow = (
      <div className={classes.SkillCard}>
        <img src={SkillIcon} alt="no img" />
        <div className={classes.SkillInfo}>
          <div className={classes.oneP}>
            <p>{this.state.skillData.name}</p>
          </div>
        </div>
        <Dropdown delete={this.deleteHandler} edit={this.editHandler} />
      </div>
    );

    if (this.state.editing) {
      toShow = (
        <div className={classes.SkillCard}>
          <img src={SkillIcon} alt="no img" />
          <div className={classes.SkillInfo}>
            {/* <input
              type="text"
              value={this.state.skillData.name}
              ref={this.nameRef}
              placeholder={text.name}
              onChange={this.inputOnChange}
            /> */}
            <MDBSelect options={this.state.options}>
              <MDBSelectInput selected="Choose your option" />
              <MDBSelectOptions search>
                <MDBSelectOption value="" disabled selected>
                  Choose a Skill
                </MDBSelectOption>
                {/*eslint-disable-next-line*/}
                {this.props.options}
              </MDBSelectOptions>
            </MDBSelect>
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

export default skillCard;
