import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WorkExperienceCard from './WorkExperienceCard/WorkExperienceCard';
import classes from './WorkExperience.module.css';
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
    workExperience: '工作经历',
    addWorkExperience: '+ 添加工作经历',
    noWorkExperience: '无工作经历',
  },
  {
    workExperience: 'Work Experience',
    addWorkExperience: '+ Add Work Experience',
    noWorkExperience: 'No Work Experience',
  },
];

const text = translation[languageHelper()];

class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsRequest: null,
      adding: false,
      addingCard: null,
    };
  }

  cancelAdding = () => {
    this.setState({ ...this.state, addingCard: null, adding: false });
  };

  postRequest = async (content) => {
    await postAsync(
      '/applicants/' + this.props.requestID + '/experiences',
      content
    );
    // console.log(`posting ${content} and response is ${response}`)
  }

  putRequest = async (id, content) => {
    await putAsync(
      '/applicants/' + this.props.requestID + '/experiences/' + id,
      content
    );
    // console.log(`putting ${content} with id ${id} and response is ${response}`)
  }

  deleteRequest = async (id) => {
    await deleteAsync(
      '/applicants/' + this.props.requestID + '/experiences/' + id
    );
    // console.log(`deleting ${id} and response is ${response}`)
  }

  getRequest = async () => {
    let cardsRequest = await getAsync(
      '/applicants/' + this.props.requestID + '/experiences'
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
    // console.log('workexp componentDidMout');
    
    await this.getRequest();
  }

  // delte data on server, delete data in state.cards
  deleteHandler = async id => {
    await this.deleteRequest(id);
    await this.getRequest();
  };

  // save data locally and send back to server
  saveHandler = async (content, id, mode) => {

    // 暂时给content加的location codes
    // content.location = {
    //   nation_code: 'CHN',
    //   location_code: '000000'
    // };

    if (mode === 'add') {
      // console.log('adding');
      await this.postRequest(content);
      await this.getRequest();
    } else if (mode === 'update') {
      // console.log('updating');
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
    let temp = (
      <WorkExperienceCard
        id="addingCard"
        deleteHandler={this.deleteHandler}
        saveHandler={this.saveHandler}
        cancel={this.cancelAdding}
      />
    );
    this.setState({
      ...this.state,
      addingCard: temp,
      adding: true,
    });
  };

  render() {
    // console.log('section render')
    let toShow;
    let cards = [];
    if (this.state.cardsRequest) {
      cards = this.state.cardsRequest.content.data.map(e => {
        // console.log(e);
        return (
          <WorkExperienceCard
            key={e.id}
            data={e}
            deleteHandler={this.deleteHandler}
            saveHandler={this.saveHandler}
          />
        );
      });
    }
    if (cards.length === 0 && this.state.addingCard === null) {
      toShow = (
        <div className={classes.WorkExperience}>
          <div className={classes.Row}>
            <p className={classes.SectionName}>{text.workExperience}</p>
            <img
              className={classes.AddIcon}
              src={addIcon}
              alt="icon"
              onClick={this.addHandler}
            />
          </div>
          <p className={classes.NoWorkExperience}>{text.noWorkExperience}</p>
        </div>
      );
    } else {
      toShow = (
        <div className={classes.WorkExperience}>
          <div className={classes.Row}>
            <p className={classes.SectionName}>{text.workExperience}</p>
            <img
              className={classes.AddIcon}
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

WorkExperience.propTypes = {
  requestID: PropTypes.string.isRequired,
};

export default WorkExperience;
