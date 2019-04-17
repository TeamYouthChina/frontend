import React from 'react';
import PropTypes from 'prop-types';
import classes from '../index.module.css';
import {MDBListGroupItem} from 'mdbreact';

export const MajorRadio = (props) => (
  <MDBListGroupItem
    className={classes.listGroupItems}
  >
    <p className={classes.listGroupItemsSecondTag}>专业</p>
    <form className={classes.radioForm}>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="major" id="radioMjr1" defaultChecked={props.checked} />
        <label className="form-check-label" htmlFor="radioMjr1">国际事务（2,980）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="major" id="radioMjr2"/>
        <label className="form-check-label" htmlFor="radioMjr2">设计艺术（986）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="major" id="radioMjr3"/>
        <label className="form-check-label" htmlFor="radioMjr3">公共健康（86）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="major" id="radioMjr4"/>
        <label className="form-check-label" htmlFor="radioMjr4">政治学（26）</label>
      </div>
      <div className="form-check">
        <input type="radio" className="form-check-input" name="major" id="radioMjr5"/>
        <label className="form-check-label" htmlFor="radioMjr5">医学（26）</label>
      </div>
    </form>
  </MDBListGroupItem>
);

MajorRadio.propTypes = {
  checked: PropTypes.bool.isRequired
};
