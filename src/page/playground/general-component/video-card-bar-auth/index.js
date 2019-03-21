import React from 'react';
import {MDBCard, MDBCol, MDBRow,} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {VideoShow} from './containers/video';
import {VideoInfor} from './containers/video-infor';
import {content} from './index.mock';
import {languageHelper} from '../../../../tool/language-helper';
import {mockGetAsync} from '../../../../tool/api-helper';

class VideoCardBarAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null
    };
    // i18n
    this.text = VideoCardBarAuthReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    const result = await mockGetAsync(content);
    this.setState({
      backend: result.content
    });
  }

  render() {
    return (this.state.backend !== null) ? (
      <MDBCard style={{boxShadow: 'none',}}>
        <MDBRow style={{margin:'0',padding:'0'}}>
          <MDBCol size="4">
            <div className="text-center" style={{padding: '0'}}>
              <VideoShow videoId={1} />
            </div>
          </MDBCol>
          <MDBCol size="8">
            <div className="social-meta" style={{color: '#454F69'}}>
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
          </MDBCol>
        </MDBRow>
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

