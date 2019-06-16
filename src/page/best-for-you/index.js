import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import {AnswerCardSquare} from '../playground/general-component/answer-card-square-fulltext';
import {ArticleCardSquare} from '../playground/general-component/article-card-square-fulltext';
import {CompanyCardSquare} from '../playground/general-component/company-card-square-id';
import {JobCardSquare} from '../playground/general-component/job-card-square-id';
import {ReviewCardSquare} from '../playground/general-component/review-card-square-fulltext';
//import {UserCardBarFull} from '../playground/general-component/user-card-bar-fulltext';


import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {get, getAsync, isLogin} from '../../tool/api-helper';
import * as deviceHelper from '../../tool/device-helper';
const defaultAva = 'http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png';

class BestForYouReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      jobList: [],
      render: 0,
      userAvatar:localStorage.getItem('avatar'),
    };
    // i18n
    this.text = BestForYouReact.i18n[languageHelper()];
    this.collect = null;


  }

  async componentDidMount() {
    if (!isLogin()) {
      this.setState({
        render: 2
      });
      return;
    }
    const result = await getAsync('/me');
    let userAvatar = this.state.userAvatar;
    if((userAvatar !== defaultAva) && userAvatar.length > 10) {
      get(`/static/${userAvatar}`).then((res)=>{
        userAvatar = res.content;
        this.setState({
          user: result,
          userAvatar
        });
      });
    } else {
      userAvatar = defaultAva;
      this.setState({
        user: result,
        userAvatar
      });
    }
    this.setState({
      render: 1,
      user: await getAsync('/me'),
      job: await getAsync('/discovery/jobs?limit=6&page=1'),
      company: await getAsync('/discovery/companies?limit=3&page=1'),
      userFulltext: await getAsync('/discovery/users?limit=3&page=1'),
      questionFulltext: await getAsync('/discovery/questions?limit=6&page=1'),
      reviewFulltext: await getAsync('/discovery/editorials?limit=3&offset=1'),
      articleFulltext: await getAsync('/discovery/articles?limit=4&page=1')
    });
  }


  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    const { userAvatar } = this.state;
    switch (this.state.render) {
      case 0:
        return(
          <div className="cell-wall">
            {/*<div*/}
            {/*className="cell-wall" style={{height: '15.23vw', background: '#4F65E1'}}*/}
            {/*>*/}
            {/*<div*/}
            {/*className="cell-membrane d-flex align-items-center"*/}
            {/*>*/}
            {/*<div className="ml-4">*/}
            {/*<p className={classes.name}>欢迎来到职道！</p>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
            <div className="cell-membrane">
              <div className={classes.spinner}>
                <div className={classes.cube1}></div>
                <div className={classes.cube2}></div>
              </div>
            </div>
          </div>
        );
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
                    <div className={classes.imgWrapper}>
                      <img
                        style={deviceHelper.getType() === deviceHelper.MOBILE ? {
                          width: '5.3vw',
                          height: '5.3vw',
                          marginTop: '-2.65vw',
                          background: '#F3F5F7'
                        } : {width: '8.67vw', height: '8.67vw', marginTop: '-4.335vw', background: '#F3F5F7'}}
                        // 因为要更新头像
                        src={userAvatar}
                        //src='http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png'
                        className="rounded-circle img-fluid p-0 float-right"
                        alt="Sample avatar"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className={classes.name}>{this.state.user.content.first_name}{this.state.user.content.last_name}，欢迎来到职道！</p>

                    <p
                      className={classes.review}
                      onClick={() => {
                        this.props.history.push('/my');
                      }}
                      style={{cursor: 'pointer'}}
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
                  <div className="d-flex  flex-wrap justify-content-between" style={{padding: '1.40vw 0'}}>
                    {this.state.job.content.data.map((item, index) => {
                      return (
                        <div style={{marginBottom: '1vw'}} key={index}>
                          <JobCardSquare
                            id={item.id}
                            jobList={this.state.jobList}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={classes.seemore}
                    onClick={() => {
                      this.props.history.push('/job-for-you/intern');
                    }}
                    style={{cursor: 'pointer'}}
                  >
                    查看更多 →
                  </div>
                  {/*<div className={classes.subtitle} style={{marginTop: '0.78vw'}}>根据您的浏览偏好推荐</div>*/}
                  {/*<div className="d-flex justify-content-between" style={{padding: '1.40vw 0'}}>*/}
                  {/*<JobCardSquare id={8} jobList={this.state.jobList} />*/}
                  {/*<JobCardSquare id={8} jobList={this.state.jobList} />*/}
                  {/*<JobCardSquare id={9} jobList={this.state.jobList} />*/}
                  {/*</div>*/}
                  {/*<div*/}
                  {/*className={classes.seemore}*/}
                  {/*onClick={() => {*/}
                  {/*this.props.history.push('/job-for-you/intern');*/}
                  {/*}}*/}
                  {/*style={{cursor: 'pointer'}}*/}
                  {/*>*/}
                  {/*查看更多 →*/}
                  {/*</div>*/}
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
                        <div style={{marginBottom: '1vw'}} key={index}>
                          <CompanyCardSquare
                            id={item.id}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={classes.seemore}
                    onClick={() => {
                      this.props.history.push('/search/company');
                    }}
                    style={{cursor: 'pointer'}}
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
                        <div style={{marginBottom: '1vw'}} key={index}>
                          <AnswerCardSquare
                            id={item.id}
                            title={item.title}
                            avatar={item.creator.avatar_url}
                            username={item.creator.username}

                          />
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={classes.seemore}
                    onClick={() => {
                      this.props.history.push('/discovery/insight');
                    }}
                    style={{cursor: 'pointer'}}
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
                          id={item.id}
                          body={item.body.previewText}
                          title={item.title}
                          avatar={item.author.avatar_url}
                          username={item.author.username}
                        />
                      );
                    })}
                  </div>

                  <div
                    className={classes.seemore}
                    onClick={() => {
                      this.props.history.push('/discovery/insight');
                    }}
                    style={{cursor: 'pointer'}}
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
                        <div style={{marginBottom: '1vw'}} key={index}>
                          <ArticleCardSquare
                            id={item.id}
                            title={item.title}
                            avatar={item.author}
                            username={item.author}
                            ifcollect={item.attention}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className={classes.seemore}
                    onClick={() => {
                      this.props.history.push('/discovery/insight');
                    }}
                    style={{cursor: 'pointer'}}
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


              {/*<div*/}
              {/*className="cell-wall" style={{padding: '2.82vw 0', background: '#FAFAFF'}}*/}
              {/*>*/}
              {/*<div*/}
              {/*className="cell-membrane"*/}
              {/*>*/}
              {/*<div className={classes.title}>精选人脉</div>*/}
              {/*<div className="d-flex justify-content-between" style={{padding: '1.40vw 0'}}>*/}

              {/*{this.state.userFulltext.content.data.map((item, index) => {*/}
              {/*return (*/}
              {/*<UserCardBarFull*/}
              {/*key={index}*/}
              {/*id={item.id}*/}
              {/*avatar={item.avatar_url}*/}
              {/*name={item.first_name+item.content.last_name}*/}
              {/*sex={item.gender}*/}
              {/*nation={item.nation}*/}
              {/*role={item.role[0]}*/}
              {/*/>*/}
              {/*);*/}
              {/*})}*/}

              {/*</div>*/}


              {/*<div*/}
              {/*className={classes.seemore}*/}
              {/*onClick={() => {*/}
              {/*this.props.history.push('/connection');*/}
              {/*}}*/}
              {/*style={{cursor: 'pointer'}}*/}
              {/*>*/}
              {/*查看更多 →*/}
              {/*</div>*/}
              {/*</div>*/}
              {/*</div>*/}

            </div>
          )
        );
      case 2:
        return (<Redirect to={`/login?to=${this.props.location.pathname}`} />);
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
