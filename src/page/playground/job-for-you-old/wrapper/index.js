import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import {content} from './mock';
import {Redirect, withRouter} from 'react-router-dom';

import {JobCardBarId} from '../../general-component/job-card-bar-id';
import {languageHelper} from '../../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../../tool/remove-url-slash-suffix';
import {mockGetAsync} from '../../../../tool/api-helper';
import {Loading} from '../component/loading';

class JobForYouWrapperReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      keyword: '',
      hasMore: true,
      list: []
    };
    // i18n
    this.text = JobForYouWrapperReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    await this.getMore();
  }
  
  getMore = async () => {
    const result = await mockGetAsync(content);
    this.setState((prevState) => {
      return {
        list: prevState.list.concat(result.content.list)
        // hasMore: backend.content.hasMore && prevState.itemList.length < 23
      };
    });
  };

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <InfiniteScroll
          dataLength={this.state.list.length}
          hasMore={this.state.hasMore}
          loader={
            <Loading />
          }
          next={this.getMore}
        >
          {
            this.state.list.map((item, index) => (
              <div
                key={index}
                style={{marginBottom: '1.56vw'}}
              >
                <JobCardBarId id={item.id} />
              </div>
            ))
          }
        </InfiniteScroll>
      </div>
    );
  }
}

JobForYouWrapperReact.i18n = [
  {},
  {}
];

JobForYouWrapperReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const JobForYouWrapper = withRouter(JobForYouWrapperReact);
