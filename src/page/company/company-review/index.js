import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {ReviewCardBarId} from '../../playground/general-component/review-card-bar-id';
import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {getAsync} from '../../../tool/api-helper';


class CompanyReviewReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      render:0,
    };
    // i18n
    this.text = CompanyReviewReact.i18n[languageHelper()];
    // style
  }
  async componentDidMount() {
    this.setState({
      render: 1,
      backend:await getAsync(`/search?type=editorial&title=${this.props.keyword}&limit=3&page=0`)
    });
  }
  render() {
    switch (this.state.render) {
      case 0:
        return null;
      case 1:
        return (
          <div>
            <div className={classes.content}>
              <p className={classes.name}>
                短则
              </p>
              <br/>
              {this.state.backend.content.data.map((item, index) => {
                return (
                  <div style={{marginBottom:'1vw'}} key={index}>
                    <ReviewCardBarId
                      id={item.content.id}
                    />
                    <hr/>
                  </div>
                );
              })}

            </div>
            <div>

            </div>
          </div>
        );
      default:
        return null;
    }
  }
}

CompanyReviewReact.i18n = [
  {},
  {}
];

CompanyReviewReact.propTypes = {
  // self
  keyword: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CompanyReview = withRouter(CompanyReviewReact);
