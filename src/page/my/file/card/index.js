import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import classes from './index.module.css';
import more from './more.png';
import shape from './Shape.png';
import {languageHelper} from '../../../../tool/language-helper';
import {withRouter} from 'react-router-dom';


class FileCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = FileCardReact.i18n[languageHelper()];
  }

  render() {
   
    return (
      <div 
        className={classes.content}
        onClick={()=>{
          //this.props.history.push(`/my/collection/${this.props.url}`);
        }}
      >
        <div className={classes.bg} >

          <img
            src={shape}
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

          <div className={classes.modify}>
            {this.props.date}
          </div>



          <span className="red-text h6">API没有</span>
        </div>
        <div>
          <div>
            <img src={more} style={{marginTop:'-1.1vw'}}/>
          </div>
          <div className={classes.delete}>
            删除
          </div>
        </div>
        

      </div>
    );
  }
}

FileCardReact.i18n = [
  {},
  {}
  
];

FileCardReact.propTypes = {
  // self

  // React Router
  text: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  history:PropTypes.object.isRequired,
  
  // React Redux
  
};

export const FileCard = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(FileCardReact));

