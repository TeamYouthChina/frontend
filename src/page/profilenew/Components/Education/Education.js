import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EducationCard from './EducationCard/EducationCard';
import classes from './Education.module.css';
import {
  getAsync,
  postAsync,
  putAsync,
  deleteAsync,
} from '../../../../tool/api-helper';
import { languageHelper } from '../../../../tool/language-helper';
import addIcon from '../../assets/add.svg';

const translation = [
  {
    education: '教育',
    addEducation: '+ 添加教育经历',
    noEducation: '无教育信息',
  },
  {
    education: 'Education',
    addEducation: '+ Add Education',
    noEducation: 'No Education',
  },
];

const text = translation[languageHelper()];

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsRequest: null,
      adding: false,
      addingCard: null,
      universityMap: null,
      majorMap: null,
      degreeMap: null,
      universityNames: [],
      majorNames: [],
      degreeNames: [],
    };
  }

  cancelAdding = () => {
    this.setState({ ...this.state, addingCard: null, adding: false });
  };

  async postRequest(content) {
    await postAsync(
      '/applicants/' + this.props.requestID + '/educations',
      content
    );
    // console.log(`posting ${content} and response is ${response}`)
  }

  async putRequest(id, content) {
    await putAsync(
      '/applicants/' + this.props.requestID + '/educations/' + id,
      content
    );
    // console.log(`putting ${content} with id ${id} and response is ${response}`)
  }

  async deleteRequest(id) {
    await deleteAsync(
      '/applicants/' + this.props.requestID + '/educations/' + id
    );
    // console.log(`deleting ${id} and response is ${response}`)
  }

  async getRequest() {
    let cardsRequest = await getAsync(
      '/applicants/' + this.props.requestID + '/educations'
    );
    // console.log(cardsRequest.content.data);
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

  /// get work data set requestedData and cards in state
  async componentDidMount() {
    // console.log('componentDidMout');
    let universityRequest = await getAsync(
      '/static/dictionaries?type=university'
    );
    // console.log(universityRequest);
    let majorRequest = await getAsync(
      '/static/dictionaries?type=major&length=full'
    );
    let degreeRequest = await getAsync('/static/dictionaries?type=degree');
    let universityMap = new Map();
    let majorMap = new Map();
    let degreeMap = new Map();
    let universityNames = [];
    let majorNames = [];
    let degreeNames = [];

    if (
      universityRequest &&
      universityRequest.content &&
      universityRequest.status.code === 2000
    ) {
      universityRequest.content.forEach(e => {
        universityMap.set(e.name, e.id);
        universityNames.push(e.name);
      });
    }

    if (
      majorRequest &&
      majorRequest.content &&
      majorRequest.status.code === 2000
    ) {
      majorRequest.content.forEach(e => {
        majorMap.set(e.name, e.id);
        majorNames.push(e.name);
      });
    }

    if (
      degreeRequest &&
      degreeRequest.content &&
      degreeRequest.status.code === 2000
    ) {
      degreeRequest.content.forEach(e => {
        degreeMap.set(e.name, e.id);
        degreeNames.push(e);
      });
    }

    let cardsRequest = await getAsync(
      '/applicants/' + this.props.requestID + '/educations'
    );
    // console.log(cardsRequest.content.data);
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
        universityMap: universityMap,
        majorMap: majorMap,
        degreeMap: degreeMap,
        universityNames: universityNames,
        majorNames: majorNames,
        degreeNames: degreeNames,
      });
    } else {
      this.setState({
        ...this.state,
        adding: false,
        addingCard: null,
        universityMap: universityMap,
        majorMap: majorMap,
        degreeMap: degreeMap,
        universityNames: universityNames,
        majorNames: majorNames,
        degreeNames: degreeNames,
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

  /// addhandler only create a empty cards
  // update the data in server and local happens in saveHandler
  addHandler = () => {
    if (this.state.adding === true) {
      alert('请先完成当前编辑');
      return;
    }
    // make a hard copy
    // let temp = this.state.cards.splice(0);
    // console.log(this.state.universityNames);
    // console.log(this.state.majorNames);
    // console.log(this.state.degreeNames);

    let temp = (
      <EducationCard
        id="addingCard"
        deleteHandler={this.deleteHandler}
        saveHandler={this.saveHandler}
        cancel={this.cancelAdding}
        universityNames={this.state.universityNames}
        majorNames={this.state.majorNames}
        degreeNames={this.state.degreeNames}
        universityMap={this.state.universityMap}
        majorMap={this.state.majorMap}
        degreeMap={this.state.degreeMap}
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
      id: content.id ? content.id : null,
      university_id: this.state.universityMap.get(content.university_id),
      major: this.state.majorMap.get(content.major),
      degree: this.state.degreeMap.get(content.degree),
      duration: {
        begin: content.duration.begin,
        end: content.duration.end,
      },
      note: content.note,
    };
  };

  render() {
    let toShow;
    let cards = [];
    // console.log(this.state.universityNames)
    // console.log(this.state.majorNames)
    // console.log(this.state.degreeNames);

    if (this.state.cardsRequest) {
      cards = this.state.cardsRequest.content.data.map(e => {
        return (
          <EducationCard
            key={e.id}
            data={e}
            deleteHandler={this.deleteHandler}
            saveHandler={this.saveHandler}
            universityNames={this.state.universityNames}
            majorNames={this.state.majorNames}
            degreeNames={this.state.degreeNames}
            universityMap={this.state.universityMap}
            majorMap={this.state.majorMap}
            degreeMap={this.state.degreeMap}
          />
        );
      });
    }
    if (cards.length === 0 && this.state.addingCard === null) {
      toShow = (
        <div className={classes.Education}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.education}</p>
            <img
              className={classes.addIcon}
              src={addIcon}
              alt="icon"
              onClick={this.addHandler}
            />
          </div>
          <p>{text.noEducation}</p>
        </div>
      );
    } else {
      toShow = (
        <div className={classes.Education}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.education}</p>
            <img
              className={classes.addIcon}
              src={addIcon}
              alt="icon"
              onClick={this.addHandler}
            />
          </div>
          {cards}
          {this.state.addingCard}
        </div>
      );
    }
    return toShow;
  }
}

Education.propTypes = {
  requestID: PropTypes.string.isRequired,
};

export default Education;
