import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {MDBListGroup, MDBListGroupItem} from 'mdbreact';

export const TagesSideBar = (props) => (
  <MDBListGroup className={classes.tagsCard}>
    <MDBListGroupItem
      className={classes.listGroupItemsTag}
    >
      <p>标签</p>
    </MDBListGroupItem>
    <MDBListGroupItem
      className={classes.listGroupItems}
    >
      
      <button className={classes.tagBtn}>{props.tags[0]}</button>
    </MDBListGroupItem>
    <MDBListGroupItem
      className={classes.listGroupItems}
    >
      <button className={classes.tagBtnSelected}>{props.tags[1]}</button>
    </MDBListGroupItem>
    <MDBListGroupItem
      className={classes.listGroupItems}
      style={{height: '10vh'}} />
  </MDBListGroup>
);

TagesSideBar.propTypes = {
  tags: PropTypes.array.isRequired
};
