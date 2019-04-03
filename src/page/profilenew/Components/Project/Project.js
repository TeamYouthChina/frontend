import React, {Component} from 'react';
import {MDBBtn} from 'mdbreact';

import ProjectCard from './ProjectCard/ProjectCard';
import classes from './Project.module.css';
import {getAsync} from '../../../../tool/api-helper';
import {languageHelper} from '../../../../tool/language-helper';

const translation = [
  {
    project: '项目',
    addProject: '+ 添加项目',
    noProject: '无项目',
  },
  {
    project: 'Project',
    addProject: '+ Add Project',
    noProject: 'No Project',
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

class Project extends Component {
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
      '/applicants/' + this.props.requestID + '/projects',      // eslint-disable-line
      true
    );
    console.log(data);      // eslint-disable-line
    let temp =
      data &&
      data.content &&
      data.content.projects &&
      data.status.code === 2000
        ? data.content.projects.map(e => {
          return (
            <ProjectCard
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
          <ProjectCard
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
      <ProjectCard
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
    if (this.state.cards.length == 0) {
      toShow = (
        <div className={classes.Project}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.project}</p>
          </div>
          <div className={classes.Container}>
            <p>{text.noProject}</p>
            <MDBBtn
              outline
              className={classes.MDBButton}
              style={MDBButtonStyle}
              color="blue-grey"
              onClick={this.addHandler}
            >
              {text.addProject}
            </MDBBtn>
          </div>
        </div>
      );
    } else {
      toShow = (
        <div className={classes.Project}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.project}</p>
          </div>
          <div className={classes.Container}>
            {this.state.cards}
            <MDBBtn
              outline
              className={classes.MDBButton}
              style={MDBButtonStyle}
              color="blue-grey"
              onClick={this.addHandler}
            >
              {text.addProject}
            </MDBBtn>
          </div>
        </div>
      );
    }
    return toShow;
  }
}

export default Project;
