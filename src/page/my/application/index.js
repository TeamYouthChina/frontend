import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ApplicationCard} from './component';
import classes from './index.module.css';
import rank from './rank.png';
import status from './status.png';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class ApplicationReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ApplicationReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div
          className="cell-wall" style={{background:'#F3F5F7'}}
        >
          <div
            className="cell-membrane" 
          >
            <div className={classes.title}>申请进度</div>
            <div className={`d-flex ${classes.tabtitle}`}>
              <div style={{width:'26.17vw',marginLeft:'3.125vw'}}>职位名称</div>
              <div style={{width:'16.875vw'}}>公司名称</div>
              <div style={{width:'12.27vw'}}>地理位置</div>
              <div style={{width:'10.23vw'}}>
                投递时间
                <span>
                  <img src={rank} className="ml-1 mb-1"/>
                </span>
              </div>
              <div style={{width:'11.09vw'}}>
                申请状态
                <span>
                  <img src={status} className="ml-1 mb-1"/>
                </span>
              </div>
            </div>
            <ApplicationCard
              applicationList={[
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'已查阅',
                },
                {
                  job: '服务体验实习生',
                  company: 'Google',
                  location:'北京',
                  date:'2019.3.1',
                  status:'未通过',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'待审阅',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'已通过',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'已面试',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'已查阅',
                },
                {
                  job: '服务体验实习生',
                  company: 'Google',
                  location:'北京',
                  date:'2019.3.1',
                  status:'未通过',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'待审阅',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'已通过',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'已面试',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'已查阅',
                },
                {
                  job: '服务体验实习生',
                  company: 'Google',
                  location:'北京',
                  date:'2019.3.1',
                  status:'未通过',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'待审阅',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'已通过',
                },
                {
                  job: '用户体验设计实习生',
                  company: '亚马逊',
                  location:'上海',
                  date:'2019.3.1',
                  status:'已面试',
                },

              ]}
            />

          </div>
        </div>
      </div>
    );
  }
}

ApplicationReact.i18n = [
  {},
  {}
];

ApplicationReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Application = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(ApplicationReact);
