import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.css';
import shape from './Shape.png';
import {languageHelper} from '../../../../../tool/language-helper';
import {withRouter} from 'react-router-dom';


class FileGeneralCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = FileGeneralCardReact.i18n[languageHelper()];
  }

  render() {
    const jobId = this.props.jobID === void 0 ? '' : `?job=${this.props.jobID}`;
    return (
      <div 
        className={classes.content}
        onClick={()=>{
          this.props.history.push(`/my/file/${this.props.url}${jobId}`);
        }}
      >
        <div className={classes.bg} >

          <img
            src={shape}
            style={{verticalAlign:'center',padding:'1.17vw 0',marginTop:'-1vw'}}
          />

        </div>
        <div style={{width:'31.125vw'}}>
          <div className={classes.name}>
            {this.props.text}
          </div>
          <div className={classes.tag}>
            {this.props.tag}
          </div>

          { /*<div className={classes.modify}>
            {this.props.date}
          </div>*/}



         
        </div>
       
        

      </div>
    );
  }
}

FileGeneralCardReact.i18n = [
  {},
  {}
  
];

FileGeneralCardReact.propTypes = {
  // self
  text: PropTypes.string.isRequired,
  jobID: PropTypes.number,
  logo: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const FileGeneralCard = withRouter(FileGeneralCardReact);

