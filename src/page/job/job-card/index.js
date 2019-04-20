import React from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';


import classes from './index.module.css';
import {Location} from '../../playground/general-component/location';
import {IfCollect} from '../../playground/general-component/if-collect';


import {languageHelper} from '../../../tool/language-helper';




class JobCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
   
    // i18n
    this.text = JobCardReact.i18n[languageHelper()];
    // style
  }
  
  render() {
    let dateFormat=require ('dataformat');
    return (
      <div className={classes.jobcard}>
        <div >
          <div className="d-flex align-items-center justify-content-start w-100">
            <div>
              <img
                src={(this.props.backend.content.organization.avatarUrl)?(this.props.backend.content.organization.avatarUrl):('http://frontendpic.oss-us-east-1.aliyuncs.com/%E5%B7%A5%E4%BD%9C.png')}
                alt="no img"
                className="img-fluid p-0 float-right"
                style={{
                  width:'5.62vw',
                  height:'auto',
                  marginRight:'2vw'
                }}
              />
            </div>
            <div className={classes.title}>{this.props.backend.content.name}</div>
           
          </div>
         
          
        
          <div 
            className={`${classes.detail}`}
          >

            <Location
              code={this.props.backend.content.location[0]}
              edit={false}
              locate={()=>{}}
              className={classes.detail}
            />
            {'开始日期：'}{dateFormat(this.props.backend.content.start_time)}  {' / '}
            {'截止日期：'}{dateFormat(this.props.backend.content.dead_line)}  {' / '}
            {'工作类型：'}{this.props.backend.content.type}

          </div>
        </div>
        <div className="align-items-between justify-content-end">
          <div style={{marginBottom:'6.5vw'}} >
            <IfCollect
              id={this.props.backend.content.id}
              type={1}
              ifcollect={this.props.backend.content.collected}
              style={{marginLeft:'5vw'}}
            />
          </div>
          <div className={`${classes.btn} d-flex`}>
            <div className="align-self-center w-100" >立即申请</div>

          </div>
        </div>
      

      </div>
    );
  }
}

JobCardReact.i18n = [
  {},
  {}
];

JobCardReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired
};

export const JobCard = withRouter(JobCardReact);
