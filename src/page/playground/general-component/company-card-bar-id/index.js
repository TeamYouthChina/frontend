import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import arrow from './arrow.svg';
import classes from './index.module.css';

import {getAsync} from '../../../../tool/api-helper';
import bag from './bag.svg';

import employee from './employee.svg';
import {IfCollect} from '../if-collect';
import location from './location.svg';

import { languageHelper } from '../../../../tool/language-helper';


class CompanyCardBarIdReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
      isLiked : false,
    };
    // i18n
    this.text = CompanyCardBarIdReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    if (this.props.id) {
      this.setState({
        backend: await getAsync(`/companies/${this.props.id}`)
      });
    } else {
      this.setState({
        backend: await getAsync('/companies/1')
      });
    }
  }


  clickOnCard = () => {};

  clickPositions = () => {};
  


  render() {
    
    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ? (
      
      <div className={classes.Card}>
        <div className={classes.Clickable} onClick={this.clickOnCard} />
        <div className={classes.UnClickable}>
          <div className={classes.Icon}>
            <img src={this.state.backend.content.avatarUrl} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Name}>
              <p>{this.state.backend.content.name}</p>
            </div>
            <div className={classes.Des1}>
              <img src={location} alt="no img" />
              <p>
                
              </p>
            </div>
            <div className={classes.Des2}>
              <img src={employee} alt="no img" />
              <p>
                <a>{this.state.backend.content.website}</a>
              </p>
            </div>
          </div>
          <div className={classes.Actions}>
            <div className={classes.Positions} onClick={this.clickPositions}>
              <button>
                <img src={bag} alt="no img" />
                <p>
                  {this.text.currently} {this.state.backend.content.jobCount}{this.text.openPos}
                </p>
                <img src={arrow} alt="no img" />
              </button>
            </div>
            <div className={classes.Like}>
              <IfCollect ifcollect={this.state.backend.content.collected}/>
            </div>
          </div>
        </div>
      </div>
    ):null;
  }
}

CompanyCardBarIdReact.i18n = [
  {
    unLike: '取消收藏',
    like: '收藏',
    currently: '目前',
    openPos: '个空缺职位',
    employee: '个员工',
  },
  {
    unLike: 'UnLike',
    like: 'Like',
    currently: 'Currently',
    openPos: 'Open Position',
    employee: 'employees',
  },
];

CompanyCardBarIdReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CompanyCardBarId = withRouter(CompanyCardBarIdReact);
