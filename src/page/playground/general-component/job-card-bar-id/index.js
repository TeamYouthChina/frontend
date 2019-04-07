import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import bag from './bag.svg';
import calender from './calender.svg';
import classes from './index.module.css';
import detail from './detail.svg';
// import jobIcon from './jobIcon.svg';
import { languageHelper } from '../../../../tool/language-helper';
import location from './location.svg';
// import { mockGetAsync } from '../../../../tool/api-helper';
import heart from './heart.svg';
import emptyHeart from './emptyHeart.svg';
// import { content } from './index.mock';

class JobCardBarIdReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      cardData: {
        content: {
          id: null,
          name: null,
          organization: {
            id: null,
            name: null,
            avatarUrl: null,
            location: null,
            website: null,
            note: null,
            nation: null,
          },
          location: null,
          type: null,
          deadLine: null,
          job_description: null,
          job_duty: null,
        },
        status: {
          code: null,
          reason: null,
        },
      },
      isLiked: false,
    };
    // i18n
    this.text = JobCardBarIdReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    // const requestedJobData = await getAsync(`/jobs/${this.props.id}`);
    // const allLikedJobsData = await getAsync(`/users/${getID()}/attentions?type=job`);
    // let testIsLiked = false;
    // allLikedJobData.content.forEach(e=>{
    //   if(e.id === this.state.cardData.content.id){
    //     testIsLiked = true;
    //     break;
    //   }
    // })
    // console.log(requestedJobData)
    // console.log(allLikedJobsData)
    // this.setState({ ...this.state, cardData: requestedJobData, isLiked: testIsLiked});
  }

  clickOnCard = () => {};

  likeClicked = () => {
    // putAsync(`/jobs/${this.state.cardData.content.id}/attention`)
  };

  unlikeClicked = () => {
    // putAsync(`/jobs/attention/${this.state.cardData.content.id}`)
  };

  render() {
    // 收藏
    let likeButton = (
      <div className={classes.Like} onClick={this.likeClicked}>
        <button>
          <img src={emptyHeart} alt="no img" />
          <p>{this.text.like}</p>
        </button>
        {/* <span style={{ color: "red" }}>api没有这个</span> */}
      </div>
    );

    // 取消收藏
    let unlikeButton = (
      <div className={classes.UnLike} onClick={this.unlikeClicked}>
        <button>
          <img src={heart} alt="no img" />
          <p>{this.text.unLike}</p>
        </button>
        {/* <span style={{ color: "red" }}>api没有这个</span> */}
      </div>
    );
    let likeOrUnlikeButton = this.state.isLiked ? unlikeButton : likeButton;

    return (
      <div className={classes.Card}>
        <div className={classes.Clickable} onClick={this.clickOnCard} />
        <div className={classes.UnClickable}>
          <div className={classes.Img}>
            <img src={this.state.cardData.content.organization.avatarUrl} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Title}>
              <p className={classes.P1}>{this.state.cardData.content.name}</p>
            </div>
            <div className={classes.Des1}>
              <p className={classes.P1}>
                {this.state.cardData.content.organization.name}
              </p>
            </div>
            <div className={classes.Des2}>
              <div className={classes.Row}>
                <div className={classes.Column}>
                  <img src={location} alt="no img" />
                  <p>{this.state.cardData.content.location}</p>
                </div>
                <div className={classes.Column}>
                  <img src={calender} alt="no img" />
                  <p>
                    3-5 {this.text.geYue}{' '}
                    <span style={{ color: 'red' }}>api没有这个</span>
                  </p>
                </div>
              </div>
              <div className={classes.Row}>
                <div className={classes.Column}>
                  <img src={detail} alt="no img" />
                  <p>
                    E-Commerce<span style={{ color: 'red' }}>api没有这个</span>
                  </p>
                </div>
                <div className={classes.Column}>
                  <img src={bag} alt="no img" />
                  <p>
                    {this.text.shenQingJieZhi}{' '}
                    {this.state.cardData.content.deadLine}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.Action}>{likeOrUnlikeButton}</div>
        </div>
      </div>
    );
  }
}

JobCardBarIdReact.i18n = [
  {
    geYue: '个月',
    shenQingJieZhi: '申请截止',
    like: '收藏',
    unLike: '取消收藏',
  },
  {
    geYue: 'months',
    shenQingJieZhi: 'Applicaiton Deadline',
    like: 'Like',
    unLike: 'Unlike',
  },
];

JobCardBarIdReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired,
};

export const JobCardBarId = withRouter(
  connect(state => {
    return {
      bodyClientWidth: state.bodyClientWidth,
    };
  })(JobCardBarIdReact)
);
