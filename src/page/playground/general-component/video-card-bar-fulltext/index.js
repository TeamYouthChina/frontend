import React from 'react';
import {MDBCard} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {VideoShow} from './containers/video';
import {VideoInfor} from './containers/video-infor';
import {languageHelper} from '../../../../tool/language-helper';
import {timeHelper} from '../../../../tool/time-helper';

class VideoCardBarFulltextReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: this.props.fulltext,
      createdTime: null
    };
    // i18n
    this.text = VideoCardBarFulltextReact.i18n[languageHelper()];
  }

  componentDidMount() {
    const myDate = this.state.backend.create_at;
    this.setState(
      {createdTime: timeHelper(myDate)}
    );
  }

  render() {
    return (
      <MDBCard news style={{boxShadow: 'none'}}>
        <div style={{margin: '0', padding: '0', display: 'flex'}}>

          <div style={{padding: '0', flexGrow: '1', height: '14.7vw'}}>
            {/*<VideoShow videoId={this.state.backend.url} />*/}
            <VideoShow videoId={1} />
          </div>

          <div style={{color: '#454F69', flexGrow: '0'}}>
            <VideoInfor
              short={'在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要'}
              title={'腾讯の问题'}
              basicFont={{
                fontFamily: 'PingFang SC',
                lineHeight: 'normal'
              }}
              description={'weYouth创始人'}
              user={this.state.backend.uploader.username}
              readingTime={568} editTime={`${this.state.createdTime}以前`} />
          </div>
        </div>
      </MDBCard>
    );
  }
}

VideoCardBarFulltextReact.i18n = [
  {},
  {},
];

VideoCardBarFulltextReact.propTypes = {
  // self
  fulltext: PropTypes.object.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const VideoCardBarFulltext = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(VideoCardBarFulltextReact));
