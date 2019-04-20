import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import classes from './index.module.css';
import imgTopViewLeft from './assets/img-topview-left.png';
import imgTopViewRight from './assets/img-topview-right.png';
import {UserCardSquareAuth} from './component/card/user-card-square-auth';
import {FriendSideBar} from './component/friends';
import {InvitationSideBar} from './component/invitation';
import {TagesSideBar} from './component/tag';
import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import {getAsync, isLogin} from '../../tool/api-helper';


class ConnectionReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0
    };
    // i18n
    this.text = ConnectionReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (!isLogin()) {
      this.setState({
        render: 2
      });
    }
    this.setState({
      render: 1,
      userFulltext: await getAsync('/discovery/users?limit=10&page=1'),
    });
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    switch (this.state.render) {
      case 1:
        return (
          <div>
            <div className="d-flex align-items-center justify-items-center" style={{background: '#ffffff'}}>
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
                  <div className="d-flex flex-wrap justify-content-space" style={{marginTop: '2.34vw', width: '70vw'}}>

                    {this.state.userFulltext.content.data.map((item, index) => {
                      return (
                        <div style={{marginBottom: '1vw', marginRight: '2vw'}} key={index}>
                          <UserCardSquareAuth
                            avatar={item.content.avatar_url}
                            name={item.content.username}
                            role={item.content.role[0]}
                            sex={item.content.gender}
                            nation={item.content.nation}
                          />
                        </div>
                      );
                    })}

                  </div>
                  <div className={classes.sideBar}>
                    <FriendSideBar number={[21, 8]} />

                    <InvitationSideBar content={'目前没有未回复的邀请'} />

                    <TagesSideBar tags={['求职经历', '面试经历']} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (<Redirect to={`/login?to=${this.props.location.pathname}`} />);
      default:
        return null;
    }
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
  location: PropTypes.object.isRequired
};

export const Connection = ConnectionReact;
