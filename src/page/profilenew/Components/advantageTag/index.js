import React, {Component} from 'react';

import {Tag} from './tag';
import classes from './index.module.css';
import addIcon from '../../assets/add.svg';
import {getAsync} from '../../../../tool/api-helper';
import {languageHelper} from '../../../../tool/language-helper';

const translation = [
  {
    advantageTag: '优势标签',
    addAdvantageTag: '+ 添加优势标签',
    noAdvantageTag: '无优势标签',
  },
  {
    advantageTag: 'Advantage Tags',
    addAdvantageTag: '+ Add Advantage Tag',
    noAdvantageTag: 'No Advantage Tag',
  },
];

const text = translation[languageHelper()];

class AdvantageTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: ['编程大神', '这是一条很长很长的', '这是一条很长的标', '这是一条很长很长的', '编程大神'],
      cards: Array(),
      flipper: true,
    };
    this.date = null;
  }

  // get work data set requestedData and cards in state
  async componentDidMount() {
    let data = await getAsync(
      `/applicants/${this.props.requestID}/experiences`,      // eslint-disable-line
      true
    );
    console.log(data);      // eslint-disable-line
    let temp =
      data &&
      data.content &&
      data.content.experiences &&
      data.status.code === 2000
        ? data.content.experiences.map(e => {
          return (
            <Tag
              key={e.id}
              id={e.id}
              content={e}
            />
          );
        })
        :
        this.state.backend.map((items, i) => {
          return (
            <Tag key={i} content={items} />
          );
        });
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
  saveHandler = (newWork, id) => {
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
          <Tag
            key={time}
            id={time}
            content={'render'}
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

  addHandler = () => {
    // timestamp
    this.date = new Date();
    const time = this.date.getTime();
    // make a hard copy
    let temp = this.state.cards.splice(0);
    temp.push(
      <Tag
        key={time}
        id={time}
        content={'new add'}
      />
    );
    this.setState(
      {
        cards: temp,
        flipper: !this.state.flipper
      });
  };

  render() {
    let toShow;
    if (this.state.cards.length === 0) {
      toShow = (
        <div className={classes.advantageTag}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.advantageTag}</p>
            <img
              className={classes.addIcon}
              src={addIcon} alt="icon"
              onClick={this.addHandler}
            />
          </div>
          <p>{text.noAdvantageTag}</p>
        </div>
      );
    } else {
      toShow = (
        <div className={classes.advantageTag}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.advantageTag}</p>
            <img
              className={classes.addIcon}
              src={addIcon} alt="icon"
              onClick={this.addHandler}
            />
          </div>
          <div className={classes.tags}>
            {this.state.cards}
          </div>
        </div>
      );
    }

    return toShow;
  }
}

export default AdvantageTag;
