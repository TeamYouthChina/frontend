import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import classes from './index.module.css';
import more from './more.png';
import {languageHelper} from '../../../../tool/language-helper';
import {withRouter} from 'react-router-dom';


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
      <div 
        className={classes.content}
        onClick={()=>{
          this.props.history.push(`/my/collection/${this.props.url}`);
        }}
      >
        <div className={classes.bg}>

          <img
            src={this.props.logo}
            className="justify-content-center align-self-center"
            style={{verticalAlign:'center',padding:'1.17vw 0'}}
          />

        </div>
        <div style={{width:'31.125vw'}}>
          <div className={classes.name}>
            {this.props.text}
          </div>
          <div className={classes.tag}>
            {this.props.tag}
          </div>
          <span className="red-text h6">API没有</span>
        </div>
        
        <div>
          <img src={more} style={{marginTop:'-1.1vw'}}/>
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
  logo: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  history:PropTypes.object.isRequired,
  
  // React Redux
  
};

export const CollectionCard = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(CollectionCardReact));

