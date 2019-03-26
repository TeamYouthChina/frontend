import React from 'react';
import classes from './related.module.css';
import rec from './Rectangle.svg';
import PropTypes from 'prop-types';

const Related = (props) => (
  <div className={classes.back}>
    <p className={classes.name}>相关回答</p>
    <dl>
      {props.related.map((item) => (
        <React.Fragment key={item}>
          <dt className={classes.detailWrapper}>
            <img className={classes.imgStyle} src={rec} alt="" />
            <span className={classes.content}>这一行的内容最多只能有两行,</span>
          </dt>
          < dd className={classes.footerWrapper}>
            <span className={classes.desSpan}>浏览 <span className={classes.numberStyle}>187</span></span>
            <span className={classes.desSpan}>回答 <span className={classes.numberStyle}>18</span></span>
          </dd>
        </React.Fragment>
      ))}
    </dl>

  </div>
);

Related.propTypes = {
  related: PropTypes.array.isRequired,
};

export default Related;
