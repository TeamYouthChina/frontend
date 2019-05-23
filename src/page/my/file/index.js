import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {Redirect} from 'react-router-dom';
import {FileGeneralCard} from './card/general-card';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class FileReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = FileReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div style={{background:'#F3F5F7'}}>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.title}>
              我的文件
            </div>
            <div className="d-flex" style={{marginBottom:'2.03vw'}}>
              <div style={{marginRight:'1.875vw'}}>
                <FileGeneralCard jobID={this.props.location.query} text={'PDF简历'} tag={'0份文件'} date={'上次修改时间：2019年3月21'} url={'pdf-resume'}/>
              </div>
              <div>
                <FileGeneralCard jobID={this.props.location.query} text={'电子简历'} tag={'0份文件'} date={'上次修改时间：2019年3月21'} url={'e-resume'}/>
              </div>
            </div>
            

          </div>
        </div>
      </div>
    );
  }
}

FileReact.i18n = [
  {},
  {}
];

FileReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const File = FileReact;
