import React from 'react';
import {MDBCard} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {videoData} from './index.mock';
import {VideoShow} from './containers/video';
import {VideoInfor} from './containers/video-infor';
import {languageHelper} from '../../../../tool/language-helper';
import {mockGetAsync} from '../../../../tool/api-helper';
import {timeHelper} from '../../../../tool/time-helper';

class VideoCardBarIdReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null,
      createdTime: null
    };
    // i18n
    this.text = VideoCardBarIdReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    const result = await mockGetAsync(videoData);
    this.setState({
      backend: result.content
    }, () => {
      this.handleCreatedTime();
    });
  }

  handleCreatedTime = () => {
    const myDate = this.state.backend.videos[0].create_at;
    const time = timeHelper(myDate);
    this.setState({
      createdTime: time
    });
  };
  
  render() {
    return (this.state.backend !== null) ? (
      <MDBCard style={{boxShadow: 'none',}}>
        <div style={{margin: '0', padding: '0', display: 'flex'}}>

          <div style={{padding: '0', flexGrow: '1', height: '14.7vw'}}>
            {/*<VideoShow videoId={this.state.backend.videos[0].url} />*/}
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
              description={'WeYouth创始人'}
              user={this.state.backend.videos[0].uploader.username}
              readingTime={912} 
              editTime={`${this.state.createdTime}以前`} />
          </div>

        </div>
      </MDBCard>
    ) : (
      <div>
        waiting
      </div>
    );
  }
}

VideoCardBarIdReact.i18n = [
  {},
  {},
];

VideoCardBarIdReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const VideoCardBarId = withRouter(VideoCardBarIdReact);

