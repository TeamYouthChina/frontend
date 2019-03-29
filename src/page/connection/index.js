import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import imgTopViewLeft from './assets/img-topview-left.png';
import imgTopViewRight from './assets/img-topview-right.png';
import {UserCardSquareAuth} from '../playground/general-component/user-card-square-auth';
import {FriendSideBar} from './component/friends';
import {InvitationSideBar} from './component/invitation';
import {TagesSideBar} from './component/tags';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';

class ConnectionReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ConnectionReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div>
        <div className="d-flex align-items-center justify-items-center">
          <div>
            <img className={classes.topViewImg} src={imgTopViewRight} alt="img" />
          </div>
          <div style={{width: '60vw'}}>
            <p className={classes.topViewTitle1}>拓宽你的人脉</p>
            <p className={classes.topViewTitle2}>接触来自不同领域的大牛们能很大程度上帮助你做决策</p>
          </div>
          <div>
            <img className={classes.topViewImg} src={imgTopViewLeft} alt="img" />
          </div>
        </div>
        <div
          className="cell-wall"
          style={{backgroundColor: '#F3F5F7'}}
        >
          <div
            className="cell-membrane"
          >
            <div className="d-flex justify-content-center">
              <div style={{display: 'flex', margin: '0', padding: '0'}}>
                <div className={classes.userCardRow}>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                  <div className={classes.userCardCol} size="5"><UserCardSquareAuth /></div>
                </div> 
              </div>
              <div className={classes.sideBar}>
                <FriendSideBar number={[21, 8]}/>
                
                <InvitationSideBar content={'目前没有未回复的邀请'}/>
                
                <TagesSideBar tags={['求职经历', '面试经历']}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ConnectionReact.i18n = [
  {},
  {}
];

ConnectionReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Connection = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(ConnectionReact);
