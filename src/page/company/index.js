import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import bg from './company-card/Rectangle 8.png';
import classes from './index.module.css';

import {CompanyCard} from './company-card';
import {CompanyDesci} from './company-descri';
import {CompanyJob} from './company-job';
import {CompanyPic} from './company-pic';
import {content} from './index.mock';

import {mockGetAsync} from '../../tool/api-helper';

class CompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend: {
        content: {
          id: null,
          name: null,
          avatarUrl: null,
          location: null,
          website: null,
          note: null,
          nation: null,
        },
        status: {
          code: null,
          reason: null,
        },
      },
    };
    // i18n
    this.text = CompanyReact.i18n[languageHelper()];
  }
  async componentDidMount() {
    // const requestedData = await getAsync();
    // this.setState({ cardData: requestedData, ...this.state });

    const requestedData = await mockGetAsync(content);
    this.setState({ ...this.state, backend: requestedData});
  }
  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div className={classes.background}>
        <div className={classes.bg}>
          <img src={bg} alt="bg" className={classes.img}/>
        </div>
        <div className="cell-wall">
          <div className="cell-membrane">
            <div className="d-flex">
              <div>
                <CompanyCard backend={this.state.backend}/>
                <CompanyDesci backend={this.state.backend}/>
                <CompanyJob/>
                <CompanyPic/>
              </div>
              <div className={classes.menu}>
                <div className={classes.font} style={{color:'#4F65E1'}}>概况</div>
                <div className={classes.font}>在招职位</div>
                <div className={classes.font}>评价</div>
                <div className={classes.font}>问答</div>
                <div className={classes.font}>图片</div>
                <div className={classes.font}>视频</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompanyReact.i18n = [
  {},
  {}
];

CompanyReact.propTypes = {
  // self

  // React Router
  backend: PropTypes.object.isRequired,
  
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired
};

export const Company = connect(
  (state) => {
    return {
      bodyClientWidth: state.bodyClientWidth
    };
  }
)(CompanyReact);
