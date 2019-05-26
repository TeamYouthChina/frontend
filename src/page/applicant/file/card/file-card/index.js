import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.css';
import logo from './logo.png';
import {languageHelper} from '../../../../../tool/language-helper';
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
        <div>
          <img 
            src={logo}
            style={{
              width:'6.8vw'
            }}
            className="img-fluid"
          />
        </div>
        <div className="ml-2">
          <div className="d-flex">
            <div className={classes.title}>{this.props.name}</div>
            <div className={`ml-1 ${classes.text}`}>中文</div>
          </div>
          <div className={`mt-1 ${classes.text}`}>上次修改：2019年3月3号</div>
          <div className="d-flex mt-3">
            <div className={`${classes['blue-text']} mr-3`}>导出</div>
            <div className={classes['blue-text']}>删除</div>
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
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  language:PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const FileCard = withRouter(FileCardReact);

