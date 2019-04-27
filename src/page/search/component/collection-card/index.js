import React from 'react';
import PropTypes from 'prop-types';
import heart from '../../assets/heart.svg';
import classes from './index.module.css';
import {Link} from 'react-router-dom';
import {getAsync} from '../../../../tool/api-helper';

export class CollectionSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionNum: 0
    };
  }
  
  async componentDidMount() {
    try {
      const result = await getAsync(`/users/${localStorage.getItem('id')}/attentions?type=${this.props.url}`);
      if (result && result.status && result.status.code === 2000) {
        this.setState(() => {
          return {collectionNum: result.content[this.props.url].item_count};
        });
      } else {
        this.setState(() => {
          return {collectionNum: 0};
        });
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  }

  render() {
    return (
      <Link
        to={{
          pathname: `/my/collection/${this.props.url}`,
        }}
      >
        <div
          className={classes.collectionSidebar}>
          <img src={heart} className={classes.collectionIcon} alt="icon" />
          <span className={classes.font}>我收藏的{this.props.collectionType}</span>
          <button className={classes.collectionBtn}>{this.state.collectionNum}</button>
        </div>
      </Link>
    );
  }
}

CollectionSidebar.propTypes = {
  collectionType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
