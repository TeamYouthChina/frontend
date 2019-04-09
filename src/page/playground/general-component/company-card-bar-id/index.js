import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import arrow from './arrow.svg';
import classes from './index.module.css';
// import { content } from './index.mock';
import bag from './bag.svg';
import des1 from './des1.svg';
import employee from './employee.svg';
import heart from './heart.svg';
import emptyHeart from './emptyHeart.svg';
// import icon from './amazon.svg';
import { languageHelper } from '../../../../tool/language-helper';
// import { mockGetAsync, getAsync, putAsync } from '../../../../tool/api-helper';
// import { all } from 'rsvp';
// import {getID} from 

class CompanyCardBarIdReact extends React.Component {
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
      isLiked : false,
    };
    // i18n
    this.text = CompanyCardBarIdReact.i18n[languageHelper()];
  }

  async componentDidMount() {
    // const requestedCompanyData = await getAsync(`/companies/${this.props.id}`);
    // const allLikedCompaniesData = await getAsync(`/users/${getID()}/attentions?type=company`);
    // let testIsLiked = false;
    // allLikedCompaniesData.content.forEach(e=>{
    //   if(e.id === this.state.cardData.content.id){
    //     testIsLiked = true;
    //     break;
    //   }
    // })
    // console.log(requestedCompanyData)
    // console.log(allLikedCompaniesData)
    // this.setState({ ...this.state, cardData: requestedCompanyData, isLiked: testIsLiked});
  }

  clickOnCard = () => {};

  clickPositions = () => {};

  likeClicked = () => {
    // putAsync(`/companies/${this.state.cardData.content.id}/attention`)

  };

  unlikeClicked = () => {
    // putAsync(`/companies/attention/${this.state.cardData.content.id}`)
  };


  render() {
    // 收藏
    let likeButton = (
      <div className={classes.Like} onClick={this.likeClicked}>
        <button>
          <img src={emptyHeart} alt="no img" />
          <p>{this.text.like}</p>
        </button>
        {/* <span style={{ color: "red" }}>api没有这个</span> */}
      </div>
    );
    
    // 取消收藏
    let unlikeButton = (
      <div className={classes.UnLike} onClick={this.unlikeClicked}>
        <button>
          <img src={heart} alt="no img" />
          <p>{this.text.unLike}</p>
        </button>
        {/* <span style={{ color: "red" }}>api没有这个</span> */}
      </div>
    );

    let likeOrUnlikeButton = (this.state.isLiked) ? unlikeButton : likeButton;
    return (
      <div className={classes.Card}>
        <div className={classes.Clickable} onClick={this.clickOnCard} />
        <div className={classes.UnClickable}>
          <div className={classes.Icon}>
            <img src={this.state.cardData.content.avatarUrl} alt="no img" />
          </div>
          <div className={classes.Info}>
            <div className={classes.Name}>
              <p>{this.state.cardData.content.name}</p>
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
            {likeOrUnlikeButton}
          </div>
        </div>
      </div>
    );
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
  location: PropTypes.object.isRequired,
  // React Redux
  bodyClientWidth: PropTypes.number.isRequired,
};

export const CompanyCardBarId = withRouter(
  connect(state => {
    return {
      bodyClientWidth: state.bodyClientWidth,
    };
  })(CompanyCardBarIdReact)
);
