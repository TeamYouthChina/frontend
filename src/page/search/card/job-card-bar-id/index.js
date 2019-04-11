import React from 'react';
import PropTypes from 'prop-types';
import {getAsync} from '../../../../tool/api-helper';
import { withRouter } from 'react-router-dom';

import bag from './bag.svg';
import calender from './calender.svg';
import classes from './index.module.css';
import detail from './detail.svg';
import favorite from './favorite.svg';
import jobIcon from './jobIcon.svg';
import { languageHelper } from '../../../../tool/language-helper';
import location from './location.svg';

class JobCardBarIdReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
    };
    // i18n
    this.text = JobCardBarIdReact.i18n[languageHelper()];
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

  clickOnCard = () => {};

  render() {
    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ? (
      <div className={classes.Card}>
        <div className={classes.Clickable} onClick={this.clickOnCard} />
        <div className={classes.UnClickable}>
          <div className={classes.Img}>
            {/* <img src={this.state.cardData.content.organization.avatarUrl} alt="no img" /> */}
            <img src={jobIcon} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Title}>
              <p className={classes.P1}>{this.state.backend.content.name}</p>
            </div>
            <div className={classes.Des1}>
              <p className={classes.P1}>{this.state.backend.content.organization.name}</p>
            </div>
            <div className={classes.Des2}>
              <div className={classes.Row}>
                <div className={classes.Column}>
                  <img src={location} alt="no img" />
                  <p>{this.state.backend.content.location}</p>
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
                  <p>{this.text.shenQingJieZhi} {this.state.backend.content.deadLine}</p>
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
    ):null;
  }
}

JobCardBarIdReact.i18n = [
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

JobCardBarIdReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const JobCardBarId = withRouter(JobCardBarIdReact);
