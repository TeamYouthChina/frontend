import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { languageHelper } from '../../../../tool/language-helper';

// eslint-disable-line no-unused-vars
import { mockGetAsync } from '../../../../tool/api-helper';
import classes from './index.module.css';
import icon from './amazon.svg';
import arrow from './arrow.svg';
import heart from './heart.svg';
import bag from './bag.svg';
import employee from './employee.svg';
import des1 from './des1.svg';

import {content} from './index.mock';

class CompanyCardBarAuthReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      cardData: {
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
    this.text = CompanyCardBarAuthReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    // const requestedData = await getAsync();
    // this.setState({ cardData: requestedData, ...this.state });

    const requestedData = await mockGetAsync(content);
    this.setState({ cardData: requestedData, ...this.state });
  }

  clickOnCard = () => {};

  clickPositions = () => {};

  unlikeClicked = () => {};

  render() {
    return (
      <div className={classes.Card}>
        <div className={classes.Clickable} onClick={this.clickOnCard} />
        <div className={classes.UnClickable}>
          <div className={classes.Icon}>
            <img src={icon} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Name}>
              <p>Amazon</p>
            </div>
            <div className={classes.Des1}>
              <img src={des1} alt="no img" />
              <p>
                e-commerce<span style={{ color: 'red' }}>api没有这个</span>
              </p>
            </div>
            <div className={classes.Des2}>
              <img src={employee} alt="no img" />
              <p>
                100{this.text.employee}
                <span style={{ color: 'red' }}>api没有这个</span>
              </p>
            </div>
          </div>
          <div className={classes.Actions}>
            <div className={classes.Positions} onClick={this.clickPositions}>
              <button>
                <img src={bag} alt="no img" />
                <p>
                  {this.text.currently + 100 + this.text.openPos}
                  <span style={{ color: 'red' }}>api没有这个</span>
                </p>
                <img src={arrow} alt="no img" />
              </button>
            </div>
            <div className={classes.UnLike} onClick={this.unlikeClicked}>
              <button>
                <img src={heart} alt="no img" />
                <p>{this.text.unLike}</p>
              </button>
              <span style={{ color: 'red' }}>api没有这个</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompanyCardBarAuthReact.i18n = [
  {
    unLike: '取消收藏',
    currently: '目前',
    openPos: '个空缺职位',
    employee: '个职位',
  },
  {
    unLike: 'UnLike',
    currently: 'Currently',
    openPos: 'Open Position',
    employee: 'employees',
  },
];

CompanyCardBarAuthReact.propTypes = {
  // self
  id: PropTypes.string.isRequired,

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired,
};

export const CompanyCardBarAuth = withRouter(
  connect(state => {
    return {
      bodyClientWidth: state.bodyClientWidth,
    };
  })(CompanyCardBarAuthReact)
);
