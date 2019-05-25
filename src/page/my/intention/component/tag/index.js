import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {MDBIcon} from 'mdbreact';

import classes from './index.module.css';
import {languageHelper} from '../../../../../tool/language-helper';

class TagReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      hover:false
    };
    // i18n
    this.text = TagReact.i18n[languageHelper()];
    // style
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }
  onMouseEnter(){
    this.setState({
      hover: true,
    });
  }

  onMouseLeave(){
    this.setState({
      hover: false,
    });
  }

  render() {
    return (
      <div
        onMouseOver={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {this.state.hover?(
          <div className={`${classes.type2} d-flex` }>
            <div className="mr-2">
            软件工程
            </div>
            <div>
              <MDBIcon  icon="times" />
            </div>
          </div>
        ):(
          <div className={classes.type1}>软件工程</div>
        )}
        
      </div>
    );
  }
}

TagReact.i18n = [
  {},
  {}
];

TagReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Tag = withRouter(TagReact);
