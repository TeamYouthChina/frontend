import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {AnswerCardSquare} from '../playground/general-component/answer-card-square-fulltext';
import {ArticleCardSquare} from '../playground/general-component/article-card-square-fulltext';
import {CompanyCardSquare} from '../playground/general-component/company-card-square-id';
import {JobCardSquare} from '../playground/general-component/job-card-square-id';
import {ReviewCardSquare} from '../playground/general-component/review-card-square-fulltext';
import {UserCardBarFull} from '../playground/general-component/user-card-bar-fulltext';


import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {getAsync} from '../../tool/api-helper';


class BestForYouReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      jobList: [],
      render: 0
    };
    // i18n
    this.text = BestForYouReact.i18n[languageHelper()];
    this.collect = null;


  }

  async componentDidMount() {
    this.setState({
      render: 1,
      user: await getAsync('/me'),
      job: await getAsync('/discovery/jobs?limit=6&page=1'),
      company: await getAsync('/discovery/companies?limit=3&page=1'),
      userFulltext: await getAsync('/discovery/users?limit=3&page=1'),
      questionFulltext: await getAsync('/discovery/questions?limit=4&page=1'),
      reviewFulltext: await getAsync('/discovery/editorials?limit=6&offset=0'),
      articleFulltext: await getAsync('/discovery/articles?limit=4&page=1')
    });
  }


  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    //console.log(this.state.questionFulltext);
    //const userdata = this.state.userFulltext.content.data;
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    switch (this.state.render) {
      case 0:
        return null;
      case 1:
        return (
          (
            <div>
              <div
                className="cell-wall" style={{height: '15.23vw', background: '#4F65E1'}}
              >

                <div
                  className="cell-membrane d-flex align-items-center"
                >
                  <div className={classes.logo}>
                    <img
                      src={(this.state.user.content.avatar_url==='---')?('http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'):(this.state.user.content.avatar_url==='---')}
                      className="rounded-circle img-fluid p-0 float-right"
                      alt="Sample avatar"
                    />
                  </div>
                  <div className="ml-4">
                    <p className={classes.name}>{this.state.user.content.username}，欢迎来到职道！</p>

                    <p 
                      className={classes.review}
                      onClick={()=>{
                        this.props.history.push('/my');
                      }}
                      style={{cursor:'pointer'}}
                    >
                      查看个人档案 →
                    </p>
                  </div>

                </div>
              </div>

              <div
                className="cell-wall" style={{padding: '2.82vw 0', background: '#FFFFFF'}}
              >
                <div
                  className="cell-membrane"
                >
                  <div className={classes.title}>职位推荐</div>
                  <div className={classes.subtitle} style={{marginTop: '0.78vw'}}>根据您的求职档案推荐</div>
                  <div className="d-flex justify-content-between" style={{padding: '1.40vw 0'}}>
                    <JobCardSquare id={7} jobList={this.state.jobList} />
                    <JobCardSquare id={3} jobList={this.state.jobList} />
                    <JobCardSquare id={9} jobList={this.state.jobList} />

                  </div>
                  <div
                    className={classes.seemore}
                    onClick={()=>{
                      this.props.history.push('/job-for-you/intern');
                    }}
                    style={{cursor:'pointer'}}
                  >
                    查看更多 →
                  </div>
                  <div className={classes.subtitle} style={{marginTop: '0.78vw'}}>根据您的浏览偏好推荐</div>
                  <div className="d-flex justify-content-between" style={{padding: '1.40vw 0'}}>
                    <JobCardSquare id={8} jobList={this.state.jobList} />
                    <JobCardSquare id={8} jobList={this.state.jobList} />
                    <JobCardSquare id={9} jobList={this.state.jobList} />
                  </div>
                  <div 
                    className={classes.seemore}
                    onClick={()=>{
                      this.props.history.push('/job-for-you/intern');
                    }}
                    style={{cursor:'pointer'}}
                  >
                    查看更多 →
                  </div>
                </div>

              </div>

              <div
                className="cell-wall" style={{padding: '2.82vw 0', background: '#FAFAFF'}}
              >
                <div
                  className="cell-membrane"
                >
                  <div className={classes.title}>公司推荐</div>
                  <div className="d-flex justify-content-between" style={{padding: '1.40vw 0'}}>
                    {this.state.company.content.data.map((item, index) => {
                      return (
                        <div style={{marginBottom:'1vw'}} key={index}>
                          <CompanyCardSquare
                            id={item.content.id}
                          />
                        </div>
                      );
                    })}
                    <CompanyCardSquare id={1}/>
                    <CompanyCardSquare id={2}/>
                    <CompanyCardSquare id={3}/>
                  </div>
                  <div
                    className={classes.seemore}
                    onClick={()=>{
                      this.props.history.push('/search/company');
                    }}
                    style={{cursor:'pointer'}}
                  >
                    查看更多 →
                  </div>
                </div>
              </div>
              <div
                className="cell-wall" style={{padding: '2.82vw 0', background: '#FFFFFF'}}
              >
                <div
                  className="cell-membrane"
                >
                  <div className={classes.title}>精选问答</div>
                  <div className="d-flex flex-wrap justify-content-between" style={{padding: '1.40vw 0'}}>
                    {this.state.questionFulltext.content.data.map((item, index) => {
                      return (
                        <div style={{marginBottom:'1vw'}} key={index}>
                          <AnswerCardSquare
                            id={item.content.id}
                            title={item.content.title}
                            avatar={item.content.creator.avatar_url}
                            username={item.content.creator.username}
                            
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={classes.seemore}
                    onClick={()=>{
                      this.props.history.push('/discovery/insight');
                    }}
                    style={{cursor:'pointer'}}
                  >
                    查看更多 →
                  </div>
                </div>
              </div>
              <div
                className="cell-wall" style={{padding: '2.82vw 0', background: '#FAFAFF'}}
              >
                <div
                  className="cell-membrane"
                >
                  <div className={classes.title}>精选短则</div>
                  <div className="d-flex flex-wrap justify-content-between" style={{padding: '1.40vw 0'}}>
                    {this.state.reviewFulltext.content.data.map((item, index) => {
                      return (
                        <ReviewCardSquare
                          key={index}
                          id={item.content.id}
                          body={item.content.body.previewText}
                          title={item.title}
                          avatar={item.content.author.avatar_url}
                          username={item.content.author.username}
                        />
                      );
                    })}
                  </div>

                  <div
                    className={classes.seemore}
                    onClick={()=>{
                      this.props.history.push('/discovery/insight');
                    }}
                    style={{cursor:'pointer'}}
                  >
                    查看更多 →
                  </div>
                </div>
              </div>
              <div
                className="cell-wall" style={{padding: '2.82vw 0', background: '#FFFFFF'}}
              >
                <div
                  className="cell-membrane"
                >
                  <div className={classes.title}>精选文章</div>
                  <div className="d-flex flex-wrap justify-content-between" style={{padding: '1.40vw 0'}}>
                    {this.state.articleFulltext.content.data.map((item, index) => {
                      return (
                        <div style={{marginBottom:'1vw'}} key={index}>
                          <ArticleCardSquare
                            id={item.content.id}
                            title={item.content.title}
                            avatar={item.content.author}
                            username={item.content.author}
                            ifcollect={item.content.attention}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className={classes.seemore}
                    onClick={()=>{
                      this.props.history.push('/discovery/insight');
                    }}
                    style={{cursor:'pointer'}}
                  >
                    查看更多 →
                  </div>
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
                className="cell-wall" style={{padding: '2.82vw 0', background: '#FAFAFF'}}
              >
                <div
                  className="cell-membrane"
                >
                  <div className={classes.title}>精选人脉</div>
                  <div className="d-flex justify-content-between" style={{padding: '1.40vw 0'}}>

                    {this.state.userFulltext.content.data.map((item, index) => {
                      return (
                        <UserCardBarFull
                          key={index}
                          avatar={item.content.avatar_url}
                          name={item.content.username}
                          sex={item.content.gender}
                          nation={item.content.nation}
                        />
                      );
                    })}

                  </div>


                  <div
                    className={classes.seemore}
                    onClick={()=>{
                      this.props.history.push('/connection');
                    }}
                    style={{cursor:'pointer'}}
                  >
                    查看更多 →
                  </div>
                </div>
              </div>

            </div>
          )
        );
      default:
        return null;
    }
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
