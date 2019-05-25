import React, {Component} from 'react';

import classes from './BasicInfo.module.css';
import {getAsync} from '../../../../../tool/api-helper';
import {languageHelper} from '../../../../../tool/language-helper';

const translation = [
  {
    basicInfo: '基本信息',
    name: '姓名',
    dob: '生日',
    gender: '性别',
    email: '邮箱',
    phone: '电话',
    // fake
    fakeName: '徐泽培',
    fakeDOB: '1995/06/17',
    fakeGender: '男',
    fakeEmail: 'example@example.com',
    fakePhone: '12312341234',
  },
  {
    basicInfo: 'Basic Info',
    name: 'Name',
    dob: 'Date of Birth',
    gender: 'Gender',
    email: 'Email',
    phone: 'Phone Number',
    // fake
    fakeName: 'Zepei Xu',
    fakeDOB: '1995/06/17',
    fakeGender: 'Male',
    fakeEmail: 'example@example.com',
    fakePhone: '12312341234',
  },
];

const text = translation[languageHelper()];

// this section have no seperate api
class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      personalInfo: {
        name: '',
        DOB: '',
        gender: '',
        email: '',
        phone: '',
      },
    };
    this.nameRef = React.createRef();
    this.DOBRef = React.createRef();
    this.genderRef = React.createRef();
    this.emailRef = React.createRef();
    this.phoneRef = React.createRef();
  }

  editHandler = () => {
    this.setState({editing: true});
  };

  // saveHandler = () => {
  //   this.setState({
  //     editing: false,
  //     personalInfo: {
  //       name: this.nameRef.current.value,
  //       DOB: this.DOBRef.current.value,
  //       gender: this.genderRef.current.value,
  //       email: this.emailRef.current.value,
  //       phone: this.phoneRef.current.value,
  //     },
  //   });
  // };

  async componentDidMount() {
    let data = await getAsync('/me', true);      // eslint-disable-line
    // let temp =
    //   data &&
    //   data.content &&
    //   data.status.code === 2000
    //     ? {
    //         name: data.content.real_name,
    //         DOB: "",
    //         gender: data.content.gender,
    //         email: data.content.email,
    //         phone: data.content.phonenumber,
    //       }
    //     : {
    //         name: text.fakeName,
    //         DOB: text.fakeDOB,
    //         gender: text.fakeGender,
    //         email: text.fakeEmail,
    //         phone: text.fakePhone
    //       };
    const temp = {
      name: text.fakeName,
      DOB: text.fakeDOB,
      gender: text.fakeGender,
      email: text.fakeEmail,
      phone: text.fakePhone
    };
    this.setState({personalInfo: temp});
  }

  render() {
    let toShow = (
      <div className={classes.BasicInfo}>
        <div className={classes.Headline}>
          <p className={classes.SectionName}>{text.basicInfo}</p>
        </div>
        <div className={classes.row}>
          <p className={classes.AttributeName}>{text.name}</p>
          <input
            disabled
            type="text"
            defaultValue={this.state.personalInfo.name}
            ref={this.nameRef}
          />
        </div>
        <div className={classes.row}>
          <p className={classes.AttributeName}>{text.dob}</p>
          <input
            disabled
            type="text"
            defaultValue={this.state.personalInfo.DOB}
            ref={this.DOBRef}
          />
        </div>
        <div className={classes.row}>
          <p className={classes.AttributeName}>{text.gender}</p>
          <input
            disabled
            type="text"
            defaultValue={this.state.personalInfo.gender}
            ref={this.genderRef}
          />
        </div>
        <div className={classes.row}>
          <p className={classes.AttributeName}>{text.email}</p>
          <input
            disabled
            type="text"
            defaultValue={this.state.personalInfo.email}
            ref={this.emailRef}
          />
        </div>
        <div className={classes.row}>
          <p className={classes.AttributeName}>{text.phone}</p>
          <input
            disabled
            type="text"
            defaultValue={this.state.personalInfo.phone}
            ref={this.phoneRef}
          />
        </div>
      </div>
    );

    return toShow;
  }
}

export default BasicInfo;
