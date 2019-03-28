import React from 'react';
import PropTypes from 'prop-types';
import classes from '../index.module.css';
import {MDBListGroupItem} from 'mdbreact';

export const CompanyRadio = (props) => (
  <MDBListGroupItem
    className={classes.listGroupItems}
  >
    <p className={classes.listGroupItemsSecondTag}>前单位</p>
    <form className={classes.radioForm}>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="company" id="radioCmp1" defaultChecked={props.checked} />
        <label className="form-check-label" htmlFor="radioCmp1">阿尔托大学（2,980）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="company" id="radioCmp2"/>
        <label className="form-check-label" htmlFor="radioCmp2">华盛顿大学（986）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="company" id="radioCmp3"/>
        <label className="form-check-label" htmlFor="radioCmp3">纽约大学（86）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="company" id="radioCmp4"/>
        <label className="form-check-label" htmlFor="radioCmp4">哈佛大学（26）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="company" id="radioCmp5"/>
        <label className="form-check-label" htmlFor="radioCmp5">伯克利加州分校（26）</label>
      </div>
    </form>
  </MDBListGroupItem>
);

CompanyRadio.propTypes = {
  checked: PropTypes.bool.isRequired
};
