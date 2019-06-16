import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Redirect, withRouter} from 'react-router-dom';

import {JobCardBarId} from '../../playground/general-component/job-card-bar-id';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
import {getAsync} from '../../../tool/api-helper';
import {Loading} from '../component/loading';
import {LoadingComponent} from './loading-component';

class JobForYouWrapperReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      keyword: '',
      hasMore: true,
      list: [],
      code: null,
      page: 0,
      searchType: ['jobs']
    };
    // i18n
    this.text = JobForYouWrapperReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    await this.getMore();
  }

  getMore = async () => {
    let result = [];
    let count = 0;
    const len = this.state.searchType.length;
    const limit = 6 / len;
    let code = null;
    while (count < len) {
      const temp = await this.getData(this.state.searchType[count++], limit);
      if(temp.content.data.length === 0) {
        this.setState(()=>{
          return {hasMore: false};
        });
      }
      code = temp.status.code;
      if (code === 5001) {
        // 权宜之计：后端的锅
        this.setState({
          code
        });
        return;
      }
      result = [...result, ...temp.content.data];
      // eslint-disable-next-line
      console.log(code);
    }
    // eslint-disable-next-line
    console.log(result);

    // const result = await mockGetAsync(content);
    this.setState((prevState) => {
      return {
        list: prevState.list.concat(result),
        page: this.state.page + 1,
        code
        // hasMore: backend.content.hasMore && prevState.itemList.length < 23
      };
    });
  };

  getData = async (parameter, limit) => {
    try {
      const result = await getAsync(`/discovery/${parameter}?limit=${limit}&page=${this.state.page}`);
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
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        {this.state.code === 2000 ?

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
          </InfiniteScroll> : <LoadingComponent />}
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
