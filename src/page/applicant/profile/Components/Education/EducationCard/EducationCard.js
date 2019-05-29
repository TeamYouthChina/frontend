import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {
  MDBAutocomplete,
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
} from 'mdbreact';

import classes from './EducationCard.module.css';
import Dropdown from '../../Dropdown/Dropdown';
import { addTimeOffset } from '../../../time_helper';
// import { Location } from './location/index';
// import { languageHelper } from '../../../../../tool/language-helper';

// const translation = [
//   {
//     uName: '学校名称',
//     begin: '开始日期',
//     end: '结束日期',
//     degree: '学位',
//   },
//   {
//     uName: 'University',
//     begin: 'Begin',
//     end: 'End',
//     degree: 'degree',
//   },
// ];
// const text = translation[languageHelper()];

class EducationCard extends Component {
  constructor(props) {
    super(props);
    // console.log(props.data)
    this.state = {
      editing: this.props.data ? false : true, // eslint-disable-line
      educationData: this.props.data // eslint-disable-line
        ? {
          id: this.props.data.id,
            university_id: this.props.data.university, // eslint-disable-line
          major: this.props.data.major,
          degree: this.props.data.degree,
          duration: {
              begin: addTimeOffset(new Date(this.props.data.duration.begin)), // eslint-disable-line
              end: addTimeOffset(new Date(this.props.data.duration.end - 1)), // eslint-disable-line
          },
            note: this.props.data.note, // eslint-disable-line
        }
        : {
          id: '',
          university_id: '',
          major: '',
          degree: '',
          duration: {
            begin: new Date(),
            end: new Date(),
          },
          note: '',
        },
      dateRange: this.props.data
        ? [
          addTimeOffset(new Date(this.props.data.duration.begin)),
          addTimeOffset(new Date(this.props.data.duration.end - 1)),
        ]
        : [new Date(), new Date()],
      universityError: false,
      majorError: false,
    };

    this.universityNameRef = React.createRef();
    this.majorNameRef = React.createRef();
  }

  componentDidMount() {
    // console.log("card mount")
  }

  // this method only toggle 'editing'
  editHandler = () => {
    this.setState({ editing: true });
  };

  // tell parent the id of the current card
  deleteHandler = () => {
    if (this.state.educationData.id) {
      this.props.deleteHandler(this.state.educationData.id); // eslint-disable-line
    } else {
      this.props.cancel();
    }
  };

  // packup new data for this card and send to parent
  saveHandler = () => {
    // console.log(this.state.educationData.duration.begin.getTime())
    // console.log(this.state.educationData.duration.end.getTime())

    if (this.state.universityError || this.state.majorError) {
      alert('至少有一个输出错误，请根据提示修改');
      return;
    } else if (
      !this.state.educationData.university_id ||
      !this.state.educationData.major ||
      !this.state.educationData.degree
    ) {
      alert('请补全信息！');
      return;
    }
    if (this.state.educationData.id) {
      // console.log(`id to delete is ${this.state.proData.id}`);
      this.props.saveHandler(
        { ...this.state.educationData },
        this.state.educationData.id,
        'update'
      );
    } else {
      this.props.saveHandler({ ...this.state.educationData }, null, 'add');
    }
    this.setState({
      ...this.state,
      editing: false,
    });
  };

  dateRangePickerOnChange = newDateRange => {
    // console.log(newDateRange[0].getTime());
    // console.log(newDateRange[1].getTime());

    this.setState({
      ...this.state,
      dateRange: newDateRange ? newDateRange : [new Date(), new Date()],
      educationData: {
        ...this.state.educationData,
        duration: {
          begin: newDateRange ? newDateRange[0] : new Date(),
          end: newDateRange ? newDateRange[1] : new Date(),
        },
      },
    });
  };

  universityNameChange = value => {
    let newValue = this.props.universityMap.get(value);
    if (!newValue) {
      // console.log("error");
      // console.log(this.universityNameRef.current);
      this.redBorderAlert(this.universityNameRef.current);
      this.setState({
        ...this.state,
        educationData: {
          ...this.state.educationData,
          university_id: value,
        },
        universityError: true,
      });
    } else {
      this.cancelRedBorderAlert(this.universityNameRef.current);
      this.setState({
        ...this.state,
        educationData: {
          ...this.state.educationData,
          university_id: value,
        },
        universityError: false,
      });
    }
  };

  majorNameChange = value => {
    let newValue = this.props.majorMap.get(value);
    if (!newValue) {
      // console.log("error");
      // console.log(this.majorNameRef.current);
      this.redBorderAlert(this.majorNameRef.current);
      this.setState({
        ...this.state,
        educationData: {
          ...this.state.educationData,
          major: value,
        },
        majorError: true,
      });
    } else {
      this.cancelRedBorderAlert(this.majorNameRef.current);
      this.setState({
        ...this.state,
        educationData: {
          ...this.state.educationData,
          major: value,
        },
        majorError: false,
      });
    }
  };

  degreeNameChange = value => {
    // console.log(value);
    this.setState({
      ...this.state,
      educationData: {
        ...this.state.educationData,
        degree: value,
      },
    });
  };

  redBorderAlert = node => {
    node.className = classes.RedBox;
  };

  cancelRedBorderAlert = node => {
    node.className = '';
  };

  onLocationChange = location => {
    this.setState({
      ...this.state,
      educationData: {
        ...this.state.educationData,
        location: {
          nation_code: location.countryCode,
          location_code: location.code,
        },
      },
    });
  };

  render() {
    // console.log(this.state.educationData)
    let toShow = (
      <div className={classes.EducationCard}>
        <img
          src='http://frontendpic.oss-us-east-1.aliyuncs.com/%E6%95%99%E8%82%B2.png'
          alt='no img'
        />
        <div className={classes.SchoolInfo}>
          <p className={classes.SchoolName}>
            {this.state.educationData.university_id}
          </p>
          <p className={classes.DegreeMajor}>
            {this.state.educationData.degree} | {this.state.educationData.major}
          </p>
          <p className={classes.TimeLocation}>
            {`${this.state.educationData.duration.begin.toLocaleDateString({
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}    ${this.state.educationData.duration.end.toLocaleDateString({
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}`}
          </p>
          {/* <p>{this.state.educationData.note}</p> */}
        </div>
        <Dropdown
          className={classes.Dropdown}
          delete={this.deleteHandler}
          edit={this.editHandler}
        />
      </div>
    );

    if (this.state.editing) {
      // console.log(this.state.educationData);
      toShow = (
        <div className={classes.EducationCard}>
          <img
            src='http://frontendpic.oss-us-east-1.aliyuncs.com/%E6%95%99%E8%82%B2.png'
            alt='no img'
          />
          <div className={classes.SchoolInfo}>
            <div ref={this.universityNameRef}>
              <MDBAutocomplete
                data={this.props.universityNames}
                label='选择你的学校'
                clear
                id='universityName'
                getValue={this.universityNameChange}
                placeholder="支持中文/英文"
                valueDefault={this.state.educationData.university_id}
              />
            </div>
            <div ref={this.majorNameRef}>
              <MDBAutocomplete
                data={this.props.majorNames}
                label='选择你的专业'
                clear
                id='majorName'
                getValue={this.majorNameChange}
                placeholder="仅支持中文"
                valueDefault={this.state.educationData.major}
              />
            </div>

            <MDBSelect getTextContent={this.degreeNameChange}>
              <MDBSelectInput selected='选择你的学位' />
              <MDBSelectOptions>
                {/* {console.log(this.props.degreeNames)} */}
                {this.props.degreeNames.map(e => {
                  if (e.name === this.state.educationData.degree) {
                    return (
                      <MDBSelectOption selected key={e.id} value={e.id}>
                        {e.name}
                      </MDBSelectOption>
                    );
                  } else {
                    return (
                      <MDBSelectOption key={e.id} value={e.id}>
                        {e.name}
                      </MDBSelectOption>
                    );
                  }
                })}
              </MDBSelectOptions>
            </MDBSelect>

            <DateRangePicker
              onChange={this.dateRangePickerOnChange}
              value={this.state.dateRange}
            />
          </div>
          <Dropdown
            className={classes.Dropdown}
            delete={this.deleteHandler}
            edit={this.editHandler}
            editing
            save={this.saveHandler}
          />
        </div>
      );
    }
    return toShow;
  }
}

EducationCard.propTypes = {
  cancel: PropTypes.func,
  data: PropTypes.object,
  saveHandler: PropTypes.func.isRequired,
  universityMap: PropTypes.object,
  majorMap: PropTypes.object,
  degree: PropTypes.object,
  universityNames: PropTypes.array,
  majorNames: PropTypes.array,
  degreeNames: PropTypes.array,
};

export default EducationCard;
