import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBRow} from 'mdbreact';
import filter from '../../assets/filter.svg';

export const FilterRow = (props) => (
  <MDBRow style={{marginBottom: '1.2vw'}}>
    <MDBCol
      size="2" className="px-0 d-flex justify-content-center align-items-center"
      style={{color: '#8D9AAF', fontSize: '1.09vw'}}>
      {props.number}个结果
    </MDBCol>
    <MDBCol className="ml-auto d-flex justify-content-end" size="2">
      <MDBDropdown>
        <MDBDropdownToggle
          className={`m-0 ${classes.dropdownButton}`} size="sm"
          style={{fontSize: '1.1vw', border: '1px solid #DBE5F7'}}>
          相关性 <img className={classes.filter} src={filter} alt="icons" />
        </MDBDropdownToggle>
        <MDBDropdownMenu basic>
          <MDBDropdownItem className={classes.dropdownItems}>规则1</MDBDropdownItem>
          <MDBDropdownItem className={classes.dropdownItems}>规则2</MDBDropdownItem>
          <MDBDropdownItem className={classes.dropdownItems}>规则3</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBCol>
  </MDBRow>
);

FilterRow.propTypes = {
  number: PropTypes.number.isRequired
};
