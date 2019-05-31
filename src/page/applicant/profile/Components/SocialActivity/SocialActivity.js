import React, {Component} from 'react';

import SocialActivityCard from './SocialActivityCard/SocialActivityCard';
import classes from './SocialActivity.module.css';
import {getAsync} from '../../../../../tool/api-helper';
import {languageHelper} from '../../../../../tool/language-helper';
import addIcon from '../../assets/add.svg';

const translation = [
  {
    social: '社会活动',
    addSocial: '+ 添加社会活动',
    noSocial: '无社会活动',
  },
  {
    social: 'Social Activity',
    addSocial: '+ Add Social Activity',
    noSocial: 'No Social Activity',
  },
];

const text = translation[languageHelper()];

class SocialActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: Array(),
      flipper: true,
    };
    this.date = null;
  }

  // get work data set requestedData and cards in state
  async componentDidMount() {
    let data = await getAsync(
      `/applicants/${this.props.requestID}/extracurriculars`,      // eslint-disable-line
      true
    );
    console.log(data);      // eslint-disable-line
    let temp =
      data &&
      data.content &&
      data.content.extracurriculars &&
      data.status.code === 2000
        ? data.content.extracurriculars.map(e => {
          return (
            <SocialActivityCard
              key={e.id}
              id={e.id}
              data={e}
              deleteHandler={this.deleteHandler}
              saveHandler={this.saveHandler}
            />
          );
        })
        : Array();
    this.setState({cards: temp});
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
        flipper: !this.state.flipper,
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
          <SocialActivityCard
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
        flipper: !this.state.flipper,
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
    this.date = new Date();
    const time = this.date.getTime();
    // make a hard copy
    let temp = this.state.cards.splice(0);
    temp.push(
      <SocialActivityCard
        key={time}
        id={time}
        deleteHandler={this.deleteHandler}
        saveHandler={this.saveHandler}
      />
    );
    this.setState({
      cards: temp,
      flipper: !this.state.flipper,
    });
  };

  render() {
    let toShow;
    if (this.state.cards.length === 0) {
      toShow = (
        <div className={classes.SocialActivity}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.social}</p>
            <img
              className={classes.addIcon}
              src={addIcon} alt="icon"
              onClick={this.addHandler}
            />
          </div>
          <p>{text.noSocial}</p>
        </div>
      );
    } else {
      toShow = (
        <div className={classes.SocialActivity}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.social}</p>
            <img
              className={classes.addIcon}
              src={addIcon} alt="icon"
              onClick={this.addHandler}
            />
          </div>
          {this.state.cards}
        </div>
      );
    }
    return toShow;
  }
}

export default SocialActivity;
