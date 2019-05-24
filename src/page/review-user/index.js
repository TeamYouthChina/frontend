import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';


import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import * as deviceHelper from '../../tool/device-helper';
import {getAsync, isLogin, get} from '../../tool/api-helper';

//const defaultAva = 'http://frontendpic.oss-us-east-1.aliyuncs.com/%E4%BA%BA.png';

class UserReviewReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
      avatar:'',
      user:''
    };
    // i18n
    this.text = UserReviewReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (!isLogin()) {
      this.setState({
        render: 2
      });
    }
    get(`/applicants/${this.props.match.params.id}`)
      .then(async res=>{
        let fileId=res.content.avatarUrl;
        let avatar_url=await getAsync(`/static/${fileId}`);
        this.setState({
          render: 1,
          user:res,
          avatar:avatar_url

        });
      } );
  }


  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }

    switch (this.state.render) {
      case 1:
        return (
          <div>
            <div className={`${classes.blue} cell-wall`}></div>
            <div className={`${classes.white} cell-wall`}>
              <div
                className="cell-membrane d-flex"
              >
                <div className={classes.imgWrapper}>
                  <img
                    style={deviceHelper.getType() === deviceHelper.MOBILE ? {
                      width: '5.3vw',
                      height: '5.3vw',
                      marginTop: '-2.65vw',
                      background: '#F3F5F7'
                    } : {width: '8.67vw', height: '8.67vw', marginTop: '-4.335vw', background: '#F3F5F7'}}

                    src={this.state.avatar}
                    className="rounded-circle img-fluid p-0 float-right"
                    alt=""
                  />
                </div>
                <div
                  className="ml-3"
                >
                  <p className={classes.name}>
                    {this.state.user.content.name}
                  </p>
                  {/*<p className={classes.education}>*/}
                  {/*{this.state.user.content.gender}{', '}{this.state.user.content.nation}*/}
                  {/*</p>*/}
                  {/*<p className={classes.position}>*/}
                  {/*{this.state.user.content.email}*/}
                  {/*</p>*/}
                </div>
              </div>
            </div>
            {/*正文部分*/}
            <div className="cell-wall">
              <div className="cell-membrane mt-3 mb-5">
                {/*教育*/}
                <div className={classes.content}>
                  <div className={classes.title}>教育经历</div>
                  <div className="mt-2 ">
                    {
                      this.state.user.content.educations.length === 0?(
                        <div className={classes.nodata}>暂无</div>
                      ):(
                        <div>
                          {this.state.user.content.educations.map((item,index)=>{
                            return(
                              <div key={index} className={classes.text}>
                                <p>{item.university}{','}{item.degree}</p>
                                <p>{item.major}</p>
                                <p>{item.duration.begin}{'-'}{item.duration.end}</p>
                                <p>{item.note}</p>
                              </div>
                            );
                          })}
                        </div>
                      )
                    }
                  </div>

                </div>
                {/*经历*/}
                <div className={classes.content}>
                  <div className={classes.title}>工作经历</div>
                  <div className="mt-2">

                    {
                      this.state.user.content.experiences.length === 0?(
                        <div className={classes.nodata}>暂无</div>
                      ):(
                        <div>
                          {this.state.user.content.experiences.map((item,index)=>{
                            return(
                              <div key={index} className={classes.text}>
                                <p>{item.employer}{','}{item.location}</p>
                                <p>{item.position}</p>
                                <p>{item.duration.begin}{'-'}{item.duration.end}</p>
                                <p>{item.note}</p>
                              </div>
                            );
                          })}
                        </div>
                      )

                    }
                  </div>


                </div>
                {/*项目*/}
                <div className={classes.content}>
                  <div className={classes.title}>项目</div>
                  <div className="mt-2">

                    {
                      this.state.user.content.projects.length === 0?(
                        <div className={classes.nodata}>暂无</div>
                      ):(
                        <div>
                          {this.state.user.content.projects.map((item,index)=>{
                            return(
                              <div key={index} className={classes.text}>
                                <p>{item.name}</p>
                                <p>{item.role}</p>
                                <p>{item.duration.begin}{'-'}{item.duration.end}</p>
                                <p>{item.note}</p>
                              </div>
                            );
                          })}
                        </div>
                      )
                    }
                  </div>

                </div>

                {/*课外活动*/}
                <div className={classes.content}>
                  <div className={classes.title}>课外活动</div>
                  <div className="mt-2">
                    {
                      this.state.user.content.extracurriculars.length === 0?(
                        <div className={classes.nodata}>暂无</div>
                      ):(
                        <div>
                          {this.state.user.content.extracurriculars.map((item,index)=>{
                            return(
                              <div key={index} className={classes.text}>
                                <p>{item.name}{','}{item.role}</p>
                                <p>{item.organization}</p>
                                <p>{item.duration.begin}{'-'}{item.duration.end}</p>
                                <p>{item.note}</p>
                              </div>
                            );
                          })}
                        </div>
                      )
                    }
                  </div>
                </div>

              </div>
            </div>

          </div>
        );
      case 2:
        return (<Redirect to={`/login?to=${this.props.location.pathname}`} />);
      default:
        return null;
    }
  }
}


UserReviewReact.i18n = [
  {},
  {}
];

UserReviewReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const UserReview = UserReviewReact;
