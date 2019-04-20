import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import bg from './company-card/Rectangle 8.png';
import classes from './index.module.css';

import {CompanyCard} from './company-card';
import {CompanyDesci} from './company-descri';
import {CompanyJob} from './company-job';
import {CompanyPic} from './company-pic';


import {getAsync, isLogin} from '../../tool/api-helper';

class CompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render: 0,
    };
    // i18n
    this.text = CompanyReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (!isLogin()) {
      this.setState({
        render: 2
      });
    }

    this.setState({
      render: 1,
      backend: await getAsync(`/companies/${this.props.match.params.id}`)
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
          <div className={classes.background}>
            <div className={classes.bg}>
              <img src={bg} alt="bg" className={classes.img} />
            </div>
            <div className="cell-wall">
              <div className="cell-membrane">
                <div className="d-flex">
                  <div>
                    <CompanyCard backend={this.state.backend} />
                    <CompanyDesci backend={this.state.backend} />
                    <CompanyJob id={this.state.backend.content.id} />
                    <CompanyPic backend={this.state.backend} />
                  </div>
                  {/*<div className={classes.menu}>
                <div className={classes.font} style={{color: '#4F65E1'}}>概况</div>
                <div className={classes.font}>在招职位</div>
                <div className={classes.font}>评价</div>
                <div className={classes.font}>问答</div>
                <div className={classes.font}>图片</div>
                <div className={classes.font}>视频</div>
              </div>*/}
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

CompanyReact.i18n = [
  {},
  {}
];

CompanyReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  // React Router
  id: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Company = CompanyReact;
