import React from 'react';

import classes from './Dropdown.module.css';
import ellipsis from '../../assets/more-horiz.svg';
import { languageHelper } from '../../../../tool/language-helper';

const translation = [
  {
    edit: '编辑',
    delete: '删除',
    save: '保存',
  },
  {
    edit: 'Edit',
    delete: 'Delete',
    save: 'save',
  },
];

const text = translation[languageHelper()];

const dropdown = props => {
  let toShow = (
    <div className={classes.dropdown}>
      <button className={classes.dropbtn}>
        <img className={classes.moreButton} src={ellipsis} alt="more"/>
      </button>
      <div className={classes.dropdown_content}>
        <ul>
          <div>
            <button onClick={props.edit}>{text.edit}</button>
          </div>
          <div>
            <button onClick={props.delete}>{text.delete}</button>
          </div>
        </ul>
      </div>
    </div>
  );
  if (props.editing) {
    toShow = (
      <div className={classes.dropdown}>
        <button className={classes.dropbtn}>
          <img className={classes.moreButton} src={ellipsis} alt="more"/>
        </button>
        <div className={classes.dropdown_content}>
          <ul>
            <div>
              <button className={classes.dropdownItem} onClick={props.save}>{text.save}</button>
            </div>  
            <div>
              <button className={classes.dropdownItem} onClick={props.delete}>{text.delete}</button>
            </div>
          </ul>
        </div>
      </div>
    );
  }
  return toShow;
};

export default dropdown;
