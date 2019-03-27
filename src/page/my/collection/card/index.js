import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import classes from './index.module.css';

import {languageHelper} from '../../../../tool/language-helper';


class CollectionCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CollectionCardReact.i18n[languageHelper()];
  }

  render() {
   
    return (
      <div className={classes.content}>
        <div className={classes.bg}>
          <img
            src={this.props.logo}
            className={classes.logo}
          />
        </div>
        <div className={classes.name}>
          {this.props.text}
        </div>
        <div>
          
        </div>
        
      </div>
    );
  }
}

CollectionCardReact.i18n = [
  {},
  {}
  
];

CollectionCardReact.propTypes = {
  // self

  // React Router
  text: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired
  
  // React Redux
  
};

export const CollectionCard = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(CollectionCardReact);
