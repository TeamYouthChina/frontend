import React from 'react';
import PropTypes from 'prop-types';
import {ApplicationCard} from './component';
import classes from './index.module.css';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
import {getAsync} from '../../../tool/api-helper';

class ApplicationReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ApplicationReact.i18n[languageHelper()];
  }
  async componentDidMount() {

    this.setState({
      backend: await getAsync(`/applicants/${localStorage.getItem('id')}/applications`)
    });

  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ?(
      <div>
        <div
          className="cell-wall" style={{background:'#F3F5F7'}}
        >
          <div
            className="cell-membrane" 
          >
            <div className={classes.title}>申请进度</div>
            <div className={`d-flex ${classes.tabtitle}`}>
              <div style={{width:'26.17vw',marginLeft:'3.125vw'}}>职位名称</div>
              <div style={{width:'26.875vw'}}>公司名称</div>
              <div style={{width:'22.27vw'}}>地理位置</div>
              <div style={{width:'11.09vw'}}>申请状态</div>
            </div>
            
            <ApplicationCard applicationList={this.state.backend.content.data}/>

          </div>
        </div>
      </div>
    ):null;
  }
}

ApplicationReact.i18n = [
  {},
  {}
];

ApplicationReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Application = ApplicationReact;
