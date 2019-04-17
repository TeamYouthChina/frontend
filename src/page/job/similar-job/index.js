import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {JobCardBarId} from '../../playground/general-component/job-card-bar-id';
import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {getAsync} from '../../../tool/api-helper';

class SimilarJobReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      jobList: []
    };
    // i18n
    this.text = SimilarJobReact.i18n[languageHelper()];
    // style
  }

  async componentDidMount() {
    const result = await this.getData(this.props.title);
    this.setState(() => {
      return {
        jobList: result.content.data
      };
    });
    // eslint-disable-next-line
    console.log(this.state.jobList);
  }

  getData = async (keyword) => {
    try {
      const result = await getAsync(`/search?type=job&title=${keyword}?limit=4`);
      if (result && result.status) {
        return result;
      } else {
        return null;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  };

  render() {
    return (
      <div className={classes.content}>
        <p className={classes.name}>相似职位</p>
        <br />
        {this.state.jobList.length !== 0 ?
          (
            this.state.jobList.map((item, index) => (
              <JobCardBarId key={index} id={item.id}/>
            ))
          )
          : <p className="h3 grey-text">没有相似职位</p>
        }
      </div>
    );
  }
}

SimilarJobReact.i18n = [
  {},
  {}
];

SimilarJobReact.propTypes = {
  title: PropTypes.string.isRequired
};

export const SimilarJob = withRouter(SimilarJobReact);
