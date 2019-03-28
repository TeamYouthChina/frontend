import React from 'react';
import PropTypes from 'prop-types';
import classes from '../index.module.css';
import {MDBListGroupItem} from 'mdbreact';

export const EducationRadio = (props) => (
  <MDBListGroupItem
    className={classes.listGroupItems}
  >
    <p className={classes.listGroupItemsSecondTag}>学历</p>
    <form className={classes.radioForm}>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="education" id="radioEdu1" defaultChecked={props.checked} />
        <label className="form-check-label" htmlFor="radioEdu1">硕士（2,980）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="education" id="radioEdu2" />
        <label className="form-check-label" htmlFor="radioEdu2">大三（986）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="education" id="radioEdu3"  />
        <label className="form-check-label" htmlFor="radioEdu3">大二（86）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="education" id="radioEdu4" />
        <label className="form-check-label" htmlFor="radioEdu4">大一（26）</label>
      </div>
    </form>
  </MDBListGroupItem>
);

EducationRadio.propTypes = {
  checked: PropTypes.bool.isRequired
};
