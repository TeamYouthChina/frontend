import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tag from './tag';
import classes from './index.module.css';
import {
  getAsync,
  postAsync,
  putAsync,
  deleteAsync,
} from '../../../../../tool/api-helper';
import addIcon from '../../assets/add.svg';
import { languageHelper } from '../../../../../tool/language-helper';

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
      cardsRequest: null,
      adding: false,
      addingCard: null,
      tagNames: null,
      tagMap: null,
    };
  }

  cancelAdding = () => {
    this.setState({ ...this.state, addingCard: null, adding: false });
  };

  postRequest = async (content) => {
    await postAsync('/applicants/' + this.props.requestID + '/skills', content);
    // console.log(`posting ${content} and response is ${response}`)
  }

  putRequest = async (id, content) => {
    await putAsync(
      '/applicants/' + this.props.requestID + '/skills/' + id,
      content
    );
    // console.log(`putting ${content} with id ${id} and response is ${response}`)
  }

  deleteRequest = async (id) => {
    await deleteAsync('/applicants/' + this.props.requestID + '/skills/' + id);
    // console.log(`deleting ${id} and response is ${response}`)
  }

  getRequest = async () => {
    let cardsRequest = await getAsync(
      '/applicants/' + this.props.requestID + '/skills'
    );

    // console.log('getting');
    if (
      cardsRequest &&
      cardsRequest.content &&
      cardsRequest.content.data &&
      cardsRequest.status.code === 2000
    ) {
      this.setState({
        ...this.state,
        cardsRequest: cardsRequest,
        adding: false,
        addingCard: null,
      });
    } else {
      this.setState({
        ...this.state,
        adding: false,
        addingCard: null,
      });
    }
  }

  // get work data set requestedData and cards in state
  async componentDidMount() {
    let tagRequest = await getAsync('/static/dictionaries?type=advantageSkill');
    let tagMap = new Map();
    let tagNames = [];

    if (tagRequest && tagRequest.content && tagRequest.status.code === 2000) {
      tagRequest.content.forEach(e => {
        tagMap.set(e.name, e.id);
        tagNames.push(e);
      });
    }

    let cardsRequest = await getAsync(
      '/applicants/' + this.props.requestID + '/skills'
    );

    // console.log('getting');
    if (
      cardsRequest &&
      cardsRequest.content &&
      cardsRequest.content.data &&
      cardsRequest.status.code === 2000
    ) {
      this.setState({
        ...this.state,
        cardsRequest: cardsRequest,
        adding: false,
        addingCard: null,
        tagMap: tagMap,
        tagNames: tagNames,
      });
    } else {
      this.setState({
        ...this.state,
        adding: false,
        addingCard: null,
        tagMap: tagMap,
        tagNames: tagNames,
      });
    }
  }

  // delte data on server, delete data in state.cards
  deleteHandler = async id => {
    await this.deleteRequest(id);
    await this.getRequest();
  };

  // save data locally and send back to server
  saveHandler = async (content, id, mode) => {
    // console.log(content);
    if (mode === 'add') {
      content = this.encodeContent(content);
      // console.log(content);
      await this.postRequest(content);
      await this.getRequest();
    } else if (mode === 'update') {
      content = this.encodeContent(content);
      // console.log(content);
      await this.putRequest(id, content);
      await this.getRequest();
    }
  };

  addHandler = () => {
    if (this.state.adding === true) {
      alert('请先完成当前编辑');
      return;
    }
    // console.log('tag section state.tagNames')
    // console.log(this.state.tagNames)

    let temp = (
      <Tag
        id='addingCard'
        deleteHandler={this.deleteHandler}
        saveHandler={this.saveHandler}
        cancel={this.cancelAdding}
        tagMap={this.state.tagMap}
        tagNames={this.state.tagNames}
      />
    );
    this.setState({
      ...this.state,
      addingCard: temp,
      adding: true,
    });
  };

  encodeContent = content => {
    return {
      label_code: this.state.tagMap.get(content.name)
    };
  };

  render() {
    let toShow;
    let cards = [];
    // console.log(this.state)
    if (this.state.cardsRequest) {
      cards = this.state.cardsRequest.content.data.map(e => {
        return (
          <Tag
            key={e.id}
            data={e}
            deleteHandler={this.deleteHandler}
            saveHandler={this.saveHandler}
            tagMap={this.state.tagMap}
            tagNames={this.state.tagNames}
          />
        );
      });
    }

    if (cards.length === 0 && this.state.addingCard === null) {
      toShow = (
        <div className={classes.AdvantageTag}>
          <div className={classes.Row}>
            <p className={classes.SectionName}>{text.advantageTag}</p>
            <img
              className={classes.AddIcon}
              src={addIcon}
              alt='icon'
              onClick={this.addHandler}
            />
          </div>
          <p className={classes.NoAdvantageTag}>{text.noAdvantageTag}</p>
        </div>
      );
    } else {
      toShow = (
        <div className={classes.AdvantageTag}>
          <div className={classes.Row}>
            <p className={classes.SectionName}>{text.advantageTag}</p>
            <img
              className={classes.addIcon}
              src={addIcon}
              alt='icon'
              onClick={this.addHandler}
            />
          </div>
          <div className={classes.CardsSection}>
            {cards}
            {this.state.addingCard}
          </div>
        </div>
      );
    }

    return toShow;
  }
}

AdvantageTag.propTypes = {
  requestID: PropTypes.string.isRequired,
};

export default AdvantageTag;
