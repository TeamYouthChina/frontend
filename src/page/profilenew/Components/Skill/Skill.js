import React, {Component} from 'react';
import {MDBBtn} from 'mdbreact';
import {MDBSelectOption} from 'mdbreact';

import SkillCard from './SkillCard/SkillCard';
import classes from './Skill.module.css';
import {getAsync} from '../../../../tool/api-helper';
import {languageHelper} from '../../../../tool/language-helper';

const translation = [
  {
    skill: '技能',
    addSkill: '+ 添加技能',
    noSkill: '无技能',
  },
  {
    skill: 'Skill',
    addSkill: '+ Add Skill',
    noSkill: 'No Skill',
  },
];

const text = translation[languageHelper()];

const MDBButtonStyle = {
  font_family: 'IBM Plex Sans',
  font_style: 'normal',
  font_weight: '600',
  line_height: 'normal',
  font_size: '18px',
  text_align: 'center',
};

class skill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      allSkills: [],
    };
    this.date = null;
  }

  // get work data set requestedData and cards in state
  async componentDidMount() {
    // this api is now currently unavailable
    let data = await getAsync(
      '/applicants/' + this.props.requestID + '/skills',      // eslint-disable-line
      true
    );
    console.log(data);      // eslint-disable-line
    let allSkillsData = await getAsync('/applicants/skills/', true);
    const tempAllSkills =
      allSkillsData &&
      allSkillsData.content &&
      allSkillsData.status.code === 2000
        ? allSkillsData.content.map((e, i) => {
          return (
            <MDBSelectOption key={i} value={e.id}>
              {e.name}
            </MDBSelectOption>
          );
        })
        : [];

    let temp =
      data && data.content && data.status.code === 2000
        ? data.content.map((e, i) => {
          return (
            <SkillCard
              key={i}
              id={i}
              data={e}
              options={tempAllSkills}
              deleteHandler={this.deleteHandler}
              saveHandler={this.saveHandler}
            />
          );
        })
        : [];

    this.setState({...this.state, cards: temp, allSkills: tempAllSkills});
  }

  async componentDidUpdate() {
  }

  // delte data on server, delete data in state.cards
  deleteHandler = id => {
    // TODO: delete data on server according to id
    // make a hard copy
    let temp = this.state.cards.splice(0);
    temp.forEach((e, i) => {
      if (e.key == id) {
        temp.splice(i, 1);
        return;
      }
    });
    this.setState(
      {
        cards: temp,
      },
      () => {
        // prepare the data to be sent back to server
        let dataToSend = this.state.cards.map(e => {      // eslint-disable-line
          return e.props.data;
        });
      }
    );
  };

  // save data locally and send back to server
  saveHandler = (newCertification, id) => {
    // TODO: update server with new saved cards
    // PUT {...this.state.requestedData, newEducation}
    // timestamp
    this.date = new Date();
    const time = this.date.getTime();
    // make a hard copy
    let temp = this.state.cards.splice(0);
    temp.forEach((e, i) => {
      if (e.key == id) {
        temp.splice(
          i,
          1,
          <SkillCard
            key={time}
            id={time}
            data={newCertification}
            deleteHandler={this.deleteHandler}
            saveHandler={this.saveHandler}
          />
        );
        return;
      }
    });
    this.setState(
      {
        cards: temp,
      },
      () => {
        // prepare data to be sent back to server
        let dataToSend = this.state.cards.map(e => {      // eslint-disable-line
          return e.props.data;
        });
      }
    );
  };

  // addhandler only create a empty cards in state.cards
  // update the data in server and local happens in saveHandler
  addHandler = () => {
    // timestamp
    // make a hard copy
    let temp = this.state.cards.concat(
      <SkillCard
        key={this.state.cards.length}
        id={this.state.cards.length}
        deleteHandler={this.deleteHandler}
        saveHandler={this.saveHandler}
      />
    );

    this.setState({
      cards: temp,
    });
  };

  render() {
    let toShow;
    if (this.state.cards.length == 0) {
      toShow = (
        <div className={classes.Skill}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.skill}</p>
          </div>
          <p>{text.noSkill}</p>
          <MDBBtn
            flat
            className={classes.MDBButton}
            style={MDBButtonStyle}
            onClick={this.addHandler}
          >
            {text.addSkill}
          </MDBBtn>
        </div>
      );
    } else {
      toShow = (
        <div className={classes.Skill}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.skill}</p>
          </div>
          {this.state.cards}
          <MDBBtn
            flat
            className={classes.MDBButton}
            style={MDBButtonStyle}
            onClick={this.addHandler}
          >
            {text.addSkill}
          </MDBBtn>
        </div>
      );
    }
    return toShow;
  }
}

export default skill;
