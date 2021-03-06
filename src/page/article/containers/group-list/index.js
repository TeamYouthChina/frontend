import React from 'react';
import {MDBIcon, MDBListGroup, MDBListGroupItem} from 'mdbreact';
import classes from './groupList.module.css';
import Create from '../../public/create.svg';

const GroupList = () => (
  <MDBListGroup className={classes.articleGroup}>
    <MDBListGroupItem
      hover
      href="/article/create"
      className={`d-flex justify-content-center align-items-center ${classes.listStyle}`}
      style={{borderTopWidth: 0, }}>
      <MDBIcon icon="edit" className={`mr-2 ${classes.groupIcon}`}/> 写文章
    </MDBListGroupItem>
    <MDBListGroupItem
      hover
      href="/question/create"
      className={`d-flex justify-content-center align-items-center ${classes.listStyle}`}>
      <MDBIcon far icon="question-circle" className={`mr-2 ${classes.groupIcon}`}/> 提问题
    </MDBListGroupItem>
    <MDBListGroupItem
      hover
      href="/review/create"
      className={`d-flex justify-content-center align-items-center ${classes.listStyle}`}>
      <img src={Create} alt="create" className={`mr-2 ${classes.groupIcon}`}/> 写短评
    </MDBListGroupItem>
  </MDBListGroup>
);

export default GroupList;
