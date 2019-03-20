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
    this.state = {};
    // i18n
    this.text = VideoCardBarAuthReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    this.setState({
      backend: await mockGetAsync(content)
    });
  }

  render() {
    return (
      <MDBCard news style={{boxShadow: 'none'}}>
        <MDBRow between>
          <MDBCol md="6" lg="4" middle>
            <div className="text-center p-3" style={{padding: '0px'}}>
              <VideoShow videoId={1} />
            </div>
          </MDBCol>
          <MDBCol md="6" lg="8" className="pl-3 pl-md-1 pr-3 py-3">
            <div className="social-meta ml-4 ml-md-0" style={{color: '#454F69'}}>
              <VideoInfor
                short={'在软件行业，操作系统平台就是那个八，其他的应用软件就是那个二。微软已经踩到了一次狗屎运，得到了软件行业80%的利润，现在，他所需要做的，就是保持住这个地位。但技术不是静止不动的，不断有新的技术生长出来，在成千上万种技术中，有一种会长成参天大树，利润无比丰厚'}
                title={'腾讯の问题'}
                basicFont={{
                  fontFamily: 'PingFang SC',
                  lineHeight: 'normal'
                }}
                description={'weYouth创始人'}
                user={'齐昊'}
                readingTime={568} editTime={'1天前'} />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBCard>
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

