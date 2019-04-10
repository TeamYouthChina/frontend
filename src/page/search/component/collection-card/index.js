import React from 'react';
import Proptypes from 'prop-types';
import heart from '../../assets/heart.svg';
import classes from './index.module.css';

export class CollectionSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number
    };
  }

  render() {
    return (
      <div
        className={classes.collectionSidebar}>
        <img src={heart} className={classes.collectionIcon} alt="icon" />
        <span className={classes.font}>我收藏的{this.props.collectionType}</span>
        <button className={classes.collectionBtn}>{this.props.number}</button>
      </div>
    );
  }
}

CollectionSidebar.propTypes = {
  number: Proptypes.number.isRequired,
  collectionType: Proptypes.string.isRequired
};
