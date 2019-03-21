import React from 'react';
import {MDBCard} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {videoData} from './index.mock';
import {VideoShow} from './containers/video';
import {VideoInfor} from './containers/video-infor';
import {languageHelper} from '../../../../tool/language-helper';
import {mockGetAsync} from '../../../../tool/api-helper';

class VideoCardBarAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: null
    };
    // i18n
    this.text = VideoCardBarAuthReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    const result = await mockGetAsync(content);
    this.setState({
      backend: result.content
    });
    // console.log()
  }

  render() {
    return (this.state.backend !== null) ? (
      <MDBCard style={{boxShadow: 'none',}}>
        <div style={{margin: '0', padding: '0', display: 'flex'}}>

          <div style={{padding: '0',flexGrow:'1',height:'14.7vw'}}>
            <VideoShow videoId={1} />
          </div>


          <div style={{color: '#454F69',flexGrow:'0'}}>
            <VideoInfor
              short={this.state.backend.short}
              title={this.state.backend.title}
              basicFont={{
                fontFamily: 'PingFang SC',
                lineHeight: 'normal'
              }}
              description={this.state.backend.description}
              user={this.state.backend.user}
              readingTime={this.state.backend.readingTime} editTime={this.state.backend.editTime} />
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

VideoCardBarAuthReact.i18n = [
  {},
  {},
];

VideoCardBarAuthReact.propTypes = {
  // self
  id: PropTypes.number.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number
};

export const VideoCardBarAuth = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(VideoCardBarAuthReact));

