import React, { Component } from "react";

import ProjectCard from "./ProjectCard/ProjectCard";
import classes from "./Project.module.css";
import { getAsync, postAsync, putAsync, deleteAsync } from "../../../../tool/api-helper";
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
      adding: false,
      addingCard: null,
    };
  }

  // time stamp
  getTimeStamp = () => {
    const date = new Date();
    return date.getTime();
  };

  cancelAdding = () => {
    this.setState({...this.state, addingCard: null, adding: false})
  }

  async postRequest(content){
    let response = await postAsync("/applicants/" + this.props.requestID + "/projects", content)
    console.log(`posting ${content} and response is ${response}`) // eslint-disable-line
  }

  async putRequest(id, content){
    let response = await putAsync("/applicants/" + this.props.requestID + "/projects/" + id, content)
    console.log(`putting ${content} with id ${id} and response is ${response}`) // eslint-disable-line
  }

  async deleteRequest(id){
    let response = await deleteAsync("/applicants/" + this.props.requestID + "/projects/" + id)
    console.log(`deleting ${id}`) // eslint-disable-line
  }

  async getRequest() {
    let data = await getAsync(
      "/applicants/" + this.props.requestID + "/projects"); // eslint-disable-line

    console.log("getting"+data)
    let temp =
      data && data.content && data.content.data && data.status.code === 2000
        ? data.content.data.map(e => {
            // const time = this.getTimeStamp();
            return (
              <ProjectCard
                key={e.id}
                data={e}
                deleteHandler={this.deleteHandler}
                saveHandler={this.saveHandler}
              />
            );
          })
        : [];
    this.setState({ ...this.state, cards: temp, adding: false, addingCard: null }, ()=>{
    });
  }

  // get work data set requestedData and cards in state
  async componentDidMount() {
    console.log("componentDidMout")
    await this.getRequest();
  }

  // delte data on server, delete data in state.cards
  deleteHandler = async (id) => {
    await this.deleteRequest(id)
    await this.getRequest()
  };

  // save data locally and send back to server
  saveHandler = async (newCertification, id, mode) => {
    if (mode === "add") {
      console.log(`adding`)
      await this.postRequest(newCertification)
      await this.getRequest()
    } else if (mode === "update") {
      console.log(`updating`)
      await this.putRequest(id,newCertification)
      await this.getRequest();
    }
  };

  // addhandler only create a empty cards
  // update the data in server and local happens in saveHandler
  addHandler = () => {
    if (this.state.adding === true) {
      alert("请先完成当前编辑");
      return;
    }
    // timestamp
    // const time = this.getTimeStamp();
    // make a hard copy
    // let temp = this.state.cards.splice(0);
    let temp = <ProjectCard
      id="addingCard"
      deleteHandler={this.deleteHandler}
      saveHandler={this.saveHandler}
      cancel={this.cancelAdding}
    />
    this.setState({
      ...this.state,
      addingCard: temp,
      adding: true,
    });
  };

  render() {
    console.log("rendering"+this.state.cards);
    let toShow;
    if (this.state.cards.length === 0 && this.state.addingCard === null) {
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
          {this.state.addingCard}
        </div>
      );
    }
    return toShow;
  }
}

export default Project;
