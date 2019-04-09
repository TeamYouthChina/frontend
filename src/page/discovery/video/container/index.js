import React from 'react';
import {MDBCol, MDBListGroup, MDBListGroupItem, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import classes from './index.module.css';

import video from '../../assets/video.svg';
import {VideoCardBarId} from '../../card/video-card-bar-id';
import {languageHelper} from '../../../../tool/language-helper';

const basicCHNFont = {
  fontFamily: 'PingFang SC',
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 'normal'
};

const navyFont = {
  ...basicCHNFont,
  color: '#31394D'
};

class DiscoveryVideoReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = DiscoveryVideoReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div className="cell-wall">
        <div className="cell-membrane">
          <MDBRow style={{marginTop: '2vw'}}>
            <MDBCol className="px-0" size="10">
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <VideoCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <VideoCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <VideoCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <VideoCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <VideoCardBarId id={1}/>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol className={classes.sideBar} size="2">
              <Link to="/video/create">
                <div
                  className={classes.videoCreateSidebar}>
                  <img src={video} className={classes.collectionIcon} alt="icon" />
                  <span style={{color: '#4F65E1', fontWeight: '500', fontSize: '1.1vw', marginLeft: '0.5vw', marginRight: '0.5vw'}}>发视频</span>
                </div>
              </Link>
              <MDBListGroup style={{fontSize: '1.1vw'}}>
                <MDBListGroupItem
                  className={classes.listGroupItemsTag}
                >
                  <p style={navyFont}>标签</p>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={classes.listGroupItems}
                >
                  <button className={classes.tagBtn}>求职技巧</button>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={classes.listGroupItems}
                >
                  <button className={classes.tagBtnSelected}>面试经历</button>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={classes.listGroupItems}
                  style={{height: '10vh'}} />
              </MDBListGroup>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
    );
  }
}

DiscoveryVideoReact.i18n = [
  {},
  {}
];

DiscoveryVideoReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
};

export const DiscoveryVideo = withRouter(connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(DiscoveryVideoReact));
