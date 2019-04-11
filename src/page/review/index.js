import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import classes from './index.module.css';
import ReviewDes from './containers/reviewDes';
import Comments from './components/comment-card-bar';
import {getAsync, isLogin} from '../../tool/api-helper';
import {timeHelper} from '../../tool/time-helper';

class ReviewReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null,
      commentsText:'2'
    };
    // i18n
    this.text = ReviewReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (isLogin()) {
      const id = this.props.match.params.id;
      try {
        const result = await getAsync(`/editorials/${id}`);
        if (result.status.code === 200) {
          this.setState(() => ({
            backend: result.content
          }));
        } else {
          this.props.history.push('/page-not-found');
        }
      } catch (e) {
        alert(e);
      }
    } else {
      this.props.history.push('/login');
    }
  }

  getCurrentPage(){}
  
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    const backend = this.state.backend;
    return (this.state.backend !== null) ? (
      <div className={classes.wrapper}>
        <ReviewDes
          content={{
            title:backend.title,
            braftEditorRaw:backend.body.braftEditorRaw
          }}
          time={timeHelper(backend.modified_at)}
          user={backend.author.username}
          description={backend.author.role}
          commentsText={this.state.commentsText}
        />
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <Comments
              getCurrentPage={this.getCurrentPage}
              commentsText={this.state.commentsText}
              commentsType={'answer'}
            />
          </div>
        </div>
      </div>
    ) : (
      <div>
        loading
      </div>
    );
  }
}

ReviewReact.i18n = [
  {},
  {}
];

ReviewReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Review = ReviewReact;
