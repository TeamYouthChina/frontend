import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import dateFormat from 'dateformat';
import bag from './bag.svg';
import calender from './calender.svg';
import classes from './index.module.css';
import detail from './detail.svg';
import {IfCollect} from '../if-collect';
import { languageHelper } from '../../../../tool/language-helper';
import location from '../company-card-bar-id/location.svg';

import {getAsync} from '../../../../tool/api-helper';
import {Location} from './location';


class JobCardBarIdReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
      isLiked: false,
      backend:'',
      starttime:'',
      deadline:'',
    };
    // i18n
    this.text = JobCardBarIdReact.i18n[languageHelper()];
  }
  

  async componentDidMount() {
    if (this.props.id) {
      let backend= await getAsync(`/jobs/${this.props.id}`);
      this.setState({
        backend: backend,
        starttime:new Date(backend.content.start_time),
        deadline:new Date(backend.content.dead_line),
        
      });
    }
  }
  
  render() {
   
    return (this.state.backend && this.state.backend.status && this.state.backend.status.code.toString().startsWith('2')) ? (
      <div 
        className={classes.Card}
        
        style={{cursor:'pointer'}}
      >
        <div className={classes.Clickable} onClick={()=>{
          this.props.history.push(`/job/${this.state.backend.content.id}`);
        }}/>
        <div className={classes.UnClickable} >
          <div className={classes.Img}>
            <img src={(this.state.backend.content.organization.avatarUrl)?(this.state.backend.content.organization.avatarUrl):('http://frontendpic.oss-us-east-1.aliyuncs.com/%E5%B7%A5%E4%BD%9C.png')} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Title}>
              <p className={classes.P1}>{this.state.backend.content.name}</p>
            </div>
            <div className={classes.Des1}>
              <p className={classes.P2}>
                {this.state.backend.content.organization.name}
              </p>
            </div>
            <div className={classes.Des2}>
              <div className={classes.Row}>
                <div className={classes.Column}>
                  <img src={location} alt="no img" />
                  <Location
                    code={this.state.backend.content.location[0]}
                    edit={false}
                    locate={()=>{}}
                  />
                </div>
                <div className={classes.Column}>
                  <img src={detail} alt="no img" />
                  <p>
                    {this.text.type}{' '}
                    {this.state.backend.content.type}
                   
                  </p>
                </div>
              </div>
              <div className={classes.Row}>
                <div className={classes.Column}>
                  <img src={calender} alt="no img" />
                  <p>
                    {this.text.kaiFangShenQing}{' '}

                    {dateFormat(this.state.starttime,'yyyy-mm-dd')}
                  </p>
                </div>
                <div className={classes.Column}>
                  <img src={bag} alt="no img" />
                  <p>
                    {this.text.shenQingJieZhi}{' '}
                    {dateFormat(this.state.deadline,'yyyy-mm-dd')}
                  </p>
                </div>
               
                
              </div>
            </div>
          </div>
          <div className={classes.Like}>
            <IfCollect 
              ifcollect={this.state.backend.content.collected} 
              type={1} 
              id={this.state.backend.content.id}
            />
          </div>
        </div>
      </div>
    ):null;
  }
}

JobCardBarIdReact.i18n = [
  {
    geYue: '个月',
    shenQingJieZhi: '申请截止',
    kaiFangShenQing:'开放申请',
    type:'类型',


  },
  {
    geYue: 'months',
    shenQingJieZhi: 'Applicaiton Deadline',
    kaiFangShenQing:'Application Start',
    type:'Type',
    
  },
];

JobCardBarIdReact.propTypes = {
  // self
  id: PropTypes.number.isRequired,

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const JobCardBarId = withRouter(JobCardBarIdReact);
