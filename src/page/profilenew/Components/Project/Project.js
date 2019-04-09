import React, { Component } from "react";

import ProjectCard from "./ProjectCard/ProjectCard";
import classes from "./Project.module.css";
import { getAsync } from "../../../../tool/api-helper";
import { languageHelper } from "../../../../tool/language-helper";
import addIcon from "../../assets/add.svg";

const translation = [
  {
    project: "项目",
    addProject: "+ 添加项目",
    noProject: "无项目",
  },
  {
    project: "Project",
    addProject: "+ Add Project",
    noProject: "No Project",
  },
];

const text = translation[languageHelper()];

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };
  }

  // time stamp
  getTimeStamp = () => {
    const date = new Date();
    return date.getTime();
  };

  // get work data set requestedData and cards in state
  async componentDidMount() {
    let data = await getAsync(
      "/applicants/" + this.props.requestID + "/projects", // eslint-disable-line
      true
    );
    let temp =
      data && data.content && data.content.projects && data.status.code === 2000
        ? data.content.projects.map(e => {
            const time = this.getTimeStamp();
            return (
              <ProjectCard
                key={time}
                id={time}
                data={e}
                deleteHandler={this.deleteHandler}
                saveHandler={this.saveHandler}
              />
            );
          })
        : [];
    this.setState({ cards: temp });
  }

  // delte data on server, delete data in state.cards
  deleteHandler = (localID, serverID) => {
    // TODO: delete data on server according to id
    // make a hard copy
    let temp = this.state.cards.splice(0);
    temp.forEach((e, i) => {
      if (e.id == localID) {
        temp.splice(i, 1);
        return;
      }
    });
    this.setState(
      {
        cards: temp,
      },
      () => {
        // call delete api using serverID
      }
    );
  };

  // save data locally and send back to server
  saveHandler = (newCertification, localID, serverID) => {
    // TODO: update server with new saved cards
    // PUT {...this.state.requestedData, newEducation}
    // timestamp
    // make a hard copy
    let temp = this.state.cards.splice(0);
    temp.forEach((e, i) => {
      if (e.id == localID) {
        // const time = getTimeStamp()
        temp.splice(
          i,
          1,
          <ProjectCard
            key={localID}
            id={localID}
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
        // save api using server ID
      }
    );
  };

  // addhandler only create a empty cards in state.cards
  // update the data in server and local happens in saveHandler
  addHandler = () => {
    // timestamp
    const time = this.getTimeStamp();
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
    });
  };

  render() {
    let toShow;
    if (this.state.cards.length === 0) {
      toShow = (
        <div className={classes.Project}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.project}</p>
            <img
              className={classes.addIcon}
              src={addIcon}
              alt="icon"
              onClick={this.addHandler}
            />
          </div>
          <div className={classes.Container}>
            <p>{text.noProject}</p>
          </div>
        </div>
      );
    } else {
      toShow = (
        <div className={classes.Project}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.project}</p>
            <img
              className={classes.addIcon}
              src={addIcon}
              alt="icon"
              onClick={this.addHandler}
            />
          </div>
          <div className={classes.Container}>{this.state.cards}</div>
        </div>
      );
    }
    return toShow;
  }
}

export default Project;
