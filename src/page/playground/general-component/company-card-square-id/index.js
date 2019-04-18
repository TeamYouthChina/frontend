

import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {IfCollect} from '../if-collect';

import {languageHelper} from '../../../../tool/language-helper';
import {getAsync} from '../../../../tool/api-helper';
import {Location} from '../location';




class CompanyCardSquareReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
    };
    // i18n
    this.text = CompanyCardSquareReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    if (this.props.id) {
      this.setState({
        backend: await getAsync(`/companies/${this.props.id}`)
      });
    } else {
      this.setState({
        backend: await getAsync('/companies/1')
      });
    }
  }

  render() {


    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ? (
      <div 
        className={classes.content}
        
        style={{cursor:'pointer'}}
      >
        <div className={classes.logo} onClick={()=>{
          this.props.history.push(`/company/${this.state.backend.content.id}`);
        }}>
          <img
            src={(this.state.backend.content.avatarUrl)?(this.state.backend.content.avatarUrl):('https://frontendpic.oss-us-east-1.aliyuncs.com/%E5%85%AC%E5%8F%B8.png')}
            alt="no img"
            className="img-fluid p-0 float-right"
          />

        </div>
        <div className={classes.title} onClick={()=>{
          this.props.history.push(`/company/${this.state.backend.content.id}`);
        }}>
          {this.state.backend.content.name}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className={classes.note}>
            <Location
              code={this.state.backend.content.location[0]}
              edit={false}
              locate={()=>{}}
            />
          </div>
          <div className={classes.note}>
            <IfCollect
              id={this.state.backend.content.id}
              type={2}
              ifcollect={this.state.backend.content.collected}
            />
          </div>
        </div>
      </div>
    ):null;
  }
}

CompanyCardSquareReact.i18n = [
  {},
  {}
];

CompanyCardSquareReact.propTypes = {
  // self

  /* 在这里添加自定义的组件属性。重要！务必添加，否则 ESlint 会报错，并导致无法 commit。 */
  id: PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
export const CompanyCardSquare = withRouter(CompanyCardSquareReact);
