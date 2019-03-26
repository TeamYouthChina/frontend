import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

import VideoDes from './containers/videoDes';
import Comments from './components/comment-card-bar';
import data from './data';

class VideoReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null,
      commentsText:'1条评论'
    };
    // i18n
    this.text = VideoReact.i18n[languageHelper()];
  }

  componentDidMount() {
    this.setState({
      backend:data.content
    });
  }

  getCurrentPage(){}

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend !== null) ? (
      <div>
        <VideoDes
          tags={this.state.backend.tags}
          user={this.state.backend.user}
          description={this.state.backend.description}
          commentsText={this.state.commentsText}
          videoTitle={this.state.backend.videoTitle}
        />
        <div style={{marginTop:'3.28vw'}} 
          className="cell-wall">
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

VideoReact.i18n = [
  {},
  {}
];

VideoReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Video = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(VideoReact);
