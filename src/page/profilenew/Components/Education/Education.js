import React, {Component} from 'react';
// import {MDBBtn} from 'mdbreact';
// import {MDBAnimation} from 'mdbreact';

import EducationCard from './EducationCard/EducationCard';
import classes from './Education.module.css';
import {getAsync} from '../../../../tool/api-helper';
// import {putAsync} from '../../../../tool/api-helper';
// import {postAsync} from '../../../../tool/api-helper';
import {languageHelper} from '../../../../tool/language-helper';
import addIcon from '../../assets/add.svg';

// const MDBButtonStyle = {
//   font_family: 'IBM Plex Sans',
//   font_style: 'normal',
//   font_weight: '600',
//   line_height: 'normal',
//   font_size: '18px',
//   text_align: 'center',
// };

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
      cards: [],
    };
  }

  // get educations data set requestedData and cards in state
  async componentDidMount() {
    let data = await getAsync(
      '/applicants/' + this.props.requestID + '/educations',      // eslint-disable-line
      true
    );
    let temp =
      data &&
      data.content &&
      data.content.educations &&
      data.status.code === 2000
        ? data.content.educations.map(e => {
          return (
            <EducationCard
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
    // let dataToSend = this.state.cards.map(e => {
    //   return e.props.data;
    // });

    // console.log(dataToSend)

    // // let response = putAsync(
    // //   "/applicants/" + this.props.requestID + "/educations",
    // //   dataToSend,
    // //   true
    // // );
  }

  // delte data on server, delete data in state.cards
  deleteHandler = async (id) => {
    // TODO: delete data on server according to id
    let temp = this.state.cards.filter(e => {
      return e.key != id;
    });

    this.setState(
      {
        cards: temp,
      },
      () => {
        // prepare the data to be sent back to server
        let dataToSend = this.state.cards.map(e => {
          return e.props.data;
        });
        console.log(dataToSend);      // eslint-disable-line
        // let response = putAsync(
        //   "/applicants/" + this.props.requestID + "/educations",
        //   dataToSend,
        //   true
        // );
      }
    );
  };

  // save data locally and send back to server
  saveHandler = (newEducation, id) => {
    // TODO: update server with new saved cards
    // PUT {...this.state.requestedData, newEducation}
    // timestamp
    let temp = this.state.cards.splice(0);
    temp.forEach((e, i) => {
      if (e.key == id) {
        temp.splice(
          i,
          1,
          <EducationCard
            key={i}
            id={i}
            data={newEducation}
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
        let dataToSend = this.state.cards.map(e => {
          return e.props.data;
        });
        console.log(dataToSend);      // eslint-disable-line
      }
    );
  };

  // addhandler only create a empty cards in state.cards
  // update the data in server and local happens in saveHandler
  addHandler = () => {
    // timestamp
    let temp = this.state.cards.splice(0);
    temp.push(
      <EducationCard
        key={temp.length}
        id={temp.length}
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
        <div className={classes.Education}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.education}</p>
            <img
              className={classes.addIcon}
              src={addIcon} alt="icon"
              onClick={this.addHandler}
            />
          </div>
          <p>{text.noEducation}</p>
          {/*<MDBBtn*/}
          {/*flat*/}
          {/*className={classes.MDBButton}*/}
          {/*style={MDBButtonStyle}*/}
          {/*onClick={this.addHandler}*/}
          {/*>*/}
          {/*{text.addEducation}*/}
          {/*</MDBBtn>*/}
        </div>
      );
    } else {
      toShow = (
        <div className={classes.Education}>
          <div className={classes.row}>
            <p className={classes.SectionName}>{text.education}</p>
            <img
              className={classes.addIcon}
              src={addIcon} alt="icon"
              onClick={this.addHandler}
            />
          </div>
          {this.state.cards}
          {/*<MDBBtn*/}
          {/*flat*/}
          {/*className={classes.MDBButton}*/}
          {/*style={MDBButtonStyle}*/}
          {/*onClick={this.addHandler}*/}
          {/*>*/}
          {/*{text.addEducation}*/}
          {/*</MDBBtn>*/}
        </div>
      );
    }
    return toShow;
  }
}

export default Education;
