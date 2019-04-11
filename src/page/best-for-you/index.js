import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {AnswerCardSquare} from '../playground/general-component/answer-card-square-id';
import {ArticleCardSquare} from '../playground/general-component/article-card-square-id';
import {CompanyCardSquare} from '../playground/general-component/company-card-square-id';
import {JobCardSquare} from '../playground/general-component/job-card-square-id';
import {ReviewCardSquare} from '../playground/general-component/review-card-square-id';
import {UserCardBarId} from '../playground/general-component/user-card-bar-id';


import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {getAsync} from '../../tool/api-helper';


class BestForYouReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      jobList:[]
    };
    // i18n
    this.text = BestForYouReact.i18n[languageHelper()];
    this.collect=null;
    
    
  }
  async componentDidMount() {
    let jobcollection=[];
    this.collect=await getAsync(`/users/1/attentions?type=${'job'}`);
    //console.log(this.collect);
    for (let i=0;i<this.collect.content.length;i++)
    {
      jobcollection.push(this.collect.content[i].id);
      //console.log(this.collect.content[i].id);
    }
    //console.log(jobcollection);
    this.setState({
      jobList:jobcollection
    });
    //console.log(this.state.jobList);
    //console.log(jobcollection);
  }
  

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div
          className="cell-wall" style={{height:'15.23vw',background:'#4F65E1'}}
        >
          
          <div
            className="cell-membrane d-flex align-items-center"
          >
            <div className={classes.logo}>
              <img
                src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg"
                className="rounded-circle img-fluid p-0 float-right w-100"
              />
            </div>
            <div className="ml-4">
              <p className={classes.name}>郭益豪，欢迎来到职道！</p>
              
              <p className={classes.review}>查看个人档案 →</p>
            </div>
           
          </div>
        </div>

        <div
          className="cell-wall" style={{padding:'2.82vw 0',background:'#FFFFFF'}}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.title}>职位推荐</div>
            <div className={classes.subtitle} style={{marginTop:'0.78vw'}}>根据您的求职档案推荐</div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <JobCardSquare id={7} jobList={this.state.jobList}/>
              <JobCardSquare id={3} jobList={this.state.jobList}/>
              <JobCardSquare id={5} jobList={this.state.jobList}/>
             
            </div>
            <div className={classes.seemore}>查看更多 →</div>
            <div className={classes.subtitle} style={{marginTop:'0.78vw'}}>根据您的浏览偏好推荐</div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <JobCardSquare id={8} jobList={this.state.jobList}/>
              <JobCardSquare id={4} jobList={this.state.jobList}/>
              <JobCardSquare id={9} jobList={this.state.jobList}/>
            </div>
            <div className={classes.seemore}>查看更多 →</div>
          </div>
          
        </div>

        <div
          className="cell-wall" style={{padding:'2.82vw 0',background:'#FAFAFF'}}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.title}>公司推荐</div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <CompanyCardSquare/>
              <CompanyCardSquare/>
              <CompanyCardSquare/>
            </div>
            <div className={classes.seemore}>查看更多 →</div>
          </div>
        </div>
        <div
          className="cell-wall" style={{padding:'2.82vw 0',background:'#FFFFFF'}}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.title}>精选问答</div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <AnswerCardSquare/>
              <AnswerCardSquare/>
              <AnswerCardSquare/>
            </div>
            <div className={classes.seemore}>查看更多 →</div>
          </div>
        </div>
        <div
          className="cell-wall" style={{padding:'2.82vw 0',background:'#FAFAFF'}}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.title}>精选短则</div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <ReviewCardSquare/>
              <ReviewCardSquare/>
              <ReviewCardSquare/>
            </div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <ReviewCardSquare/>
              <ReviewCardSquare/>
              <ReviewCardSquare/>
            </div>
            <div className={classes.seemore}>查看更多 →</div>
          </div>
        </div>
        <div
          className="cell-wall" style={{padding:'2.82vw 0',background:'#FFFFFF'}}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.title}>精选文章</div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <ArticleCardSquare/>
              <ArticleCardSquare/>
            </div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <ArticleCardSquare/>
              <ArticleCardSquare/>
            </div>
            <div className={classes.seemore}>查看更多 →</div>
          </div>
        </div>
        {/*
          <div
            className="cell-wall" style={{padding:'2.82vw 0',background:'#FAFAFF'}}
          >
            <div
              className="cell-membrane"
            >
              <div className={classes.title}>精选视频</div>
            </div>
          </div>
        */}
        
        
        <div
          className="cell-wall" style={{padding:'2.82vw 0',background:'#FAFAFF'}}
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.title}>精选人脉</div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <UserCardBarId/>
              <UserCardBarId/>
              <UserCardBarId/>
            </div>
            <div className="d-flex justify-content-between" style={{padding:'1.40vw 0'}}>
              <UserCardBarId/>
              <UserCardBarId/>
              <UserCardBarId/>
            </div>
            
            <div className={classes.seemore}>查看更多 →</div>
          </div>
        </div>
        
      </div>
    );
  }
}

BestForYouReact.i18n = [
  {},
  {}
];

BestForYouReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const BestForYou = BestForYouReact;
