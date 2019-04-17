



import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';


import classes from './index.module.css';
import more from './more.png';
import {IfCollect} from '../if-collect';

import {languageHelper} from '../../../../tool/language-helper';

import {getAsync} from '../../../../tool/api-helper';



class JobCardSquareReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      isCollect:false,
    };
    // i18n
    this.text = JobCardSquareReact.i18n[languageHelper()];
    
  }
  async componentDidMount() {
    if (this.props.id) {
      
      this.setState({
        backend: await getAsync(`/jobs/${this.props.id}`)
      });
    } else {
      this.setState({
        backend: await getAsync('/jobs/1')
      });
    }
  }
  render() {



    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ? (
      <div 
        className={classes.content}
        onClick={()=>{
          this.props.history.push(`/job/${this.state.backend.content.id}`);
        }}
        style={{cursor:'pointer'}}
      >
        <div className="d-flex justify-content-between">
          <div className={classes.logo}>
            <img 
              src={(this.state.backend.content.organization.avatarUrl)?(this.state.backend.content.organization.avatarUrl):('http://frontendpic.oss-us-east-1.aliyuncs.com/%E5%B7%A5%E4%BD%9C.png')} 
              alt="no img"
              className="img-fluid p-0 float-right"
            />
            
          </div>
          <div>
            <img
              src={more}
            />
          </div>
        </div>
        <div className={classes.title}>{this.state.backend.content.name}</div>
        <div className={classes.company}>{this.state.backend.content.organization.name}</div>
        <div className={classes.location}>{this.state.backend.content.location}</div>
        <div className="d-flex justify-content-between">
          <div className={classes.ddl}>{this.state.backend.content.deadLine}</div>
          
          <div className={classes.ddl}> 
            <IfCollect 
              id={this.state.backend.content.id}
              type={1}
              ifcollect={this.state.backend.content.collected}
              style={{zIndex:'500'}}
            />
          </div>
          
        </div>
       
        
      </div>
    ):null;
  }
}

JobCardSquareReact.i18n = [
  {},
  {}
];

JobCardSquareReact.propTypes = {
  // self

  /* 在这里添加自定义的组件属性。重要！务必添加，否则 ESlint 会报错，并导致无法 commit。 */

  // React Router
  match: PropTypes.object.isRequired,
  id:PropTypes.object.isRequired,
  jobList:PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
  
};

/* 模块命名：你的命名被用在这里 */

export const JobCardSquare = withRouter(JobCardSquareReact);

/* 编辑完成后，请务必使用 `eslint.sh --fix .` 进行代码检查。若 ESlint 报错，则无法 commit。 */

/* 区块注释的内容应当删去 */
