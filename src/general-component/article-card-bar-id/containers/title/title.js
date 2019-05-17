import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MDBIcon} from 'mdbreact';
import classes from './index.module.css';

const Title = (props) => (
  <div className={classes.wrapper}>
    <Link  to={{
      pathname:`/article/${props.id}`,
    }}>
      <strong className={classes.title}>{props.title}</strong>
    </Link>
    {String(props.userId) === window.localStorage.id && (
      <div onClick={props.onShowList} className={classes.iconStyle} >
        <MDBIcon icon="ellipsis-h"/>
        {props.showList && (
          <ul className={classes.iconUl}>
            <li>
              <Link style={{color:'#212529'}} to={`/article/${props.id}/edit`}>
                编辑内容
              </Link>
            </li>
            <li onClick={props.onGoDelete}>
              删除内容
            </li>
          </ul>
        )}
      </div>
    )}
  </div>
  
);

Title.propTypes = {
  // self
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  onShowList: PropTypes.func.isRequired,
  onGoDelete: PropTypes.func.isRequired,
  showList: PropTypes.bool.isRequired,
};

export default Title;
