import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import bag from './bag.svg';
import calender from './calender.svg';
import classes from './index.module.css';
import detail from './detail.svg';
import favorite from './favorite.svg';
import jobIcon from './jobIcon.svg';
import { languageHelper } from '../../../../tool/language-helper';
import location from './location.svg';
import { mockGetAsync } from '../../../../tool/api-helper';

import { content } from './index.mock';

class JobCardBarAuthReact extends React.Component {
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
    };
    // i18n
    this.text = JobCardBarAuthReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    // const requestedData = await getAsync();
    // this.setState({ ...this.state, cardData: requestedData, });
    const requestedData = await mockGetAsync(content);
    this.setState({ ...this.state, cardData: requestedData });
  }

  clickOnCard = () => {};

  render() {
    return (
      <div className={classes.Card}>
        <div className={classes.Clickable} onClick={this.clickOnCard} />
        <div className={classes.UnClickable}>
          <div className={classes.Img}>
            {/* <img src={this.state.cardData.content.organization.avatarUrl} alt="no img" /> */}
            <img src={jobIcon} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Title}>
              <p className={classes.P1}>{this.state.cardData.content.name}</p>
            </div>
            <div className={classes.Des1}>
              <p className={classes.P1}>{this.state.cardData.content.organization.name}</p>
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
                  <p>{this.text.shenQingJieZhi} {this.state.cardData.content.deadLine}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.Action}>
            <div className={classes.Like}>
              <button>
                <img src={favorite} alt="no img" />
                {this.text.shouCang}
              </button>
              <span style={{ color: 'red' }}>api没有这个</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

JobCardBarAuthReact.i18n = [
  {
    geYue: '个月',
    shenQingJieZhi: '申请截止',
    shouCang: '收藏',
  },
  {
    geYue: 'months',
    shenQingJieZhi: 'Applicaiton Deadline',
    shouCang: 'Like',
  },
];

JobCardBarAuthReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired,
};

export const JobCardBarAuth = withRouter(
  connect(state => {
    return {
      bodyClientWidth: state.bodyClientWidth,
    };
  })(JobCardBarAuthReact)
);
