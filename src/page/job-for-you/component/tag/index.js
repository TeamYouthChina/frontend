import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {MDBListGroup, MDBListGroupItem} from 'mdbreact';

export const TagSidebar = (props) => (
  <MDBListGroup
    style={{fontSize: '1.1vw', marginLeft: '1.56vw'}}>
    <MDBListGroupItem
      className={classes.listGroupItemsTag}
    >
      <p className={classes.title}>标签</p>
    </MDBListGroupItem>
    <MDBListGroupItem
      className={classes.listGroupItems}
    >
      <button className={classes.tagBtnSelected}>{props.tags[0]}</button>
    </MDBListGroupItem>

    {props.tags.map((item, index) =>
      <MDBListGroupItem
        key={index}
        className={classes.listGroupItems}
      >
        <button className={classes.tagBtn}>{item}</button>
      </MDBListGroupItem>
    )}
    <MDBListGroupItem
      className={classes.listGroupItems}
      style={{height: '10vh'}} />
  </MDBListGroup>
);

TagSidebar.propTypes = {
  tags: PropTypes.array.isRequired
};
