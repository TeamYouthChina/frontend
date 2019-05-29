import React from 'react';
import PropTypes from 'prop-types';
import article from './article.png';
import answer from './answer.png';
import classes from './index.module.css';
//import comment from './comment.png';
import {Redirect} from 'react-router-dom';
import {CreationCard} from './card';
import {isLogin} from '../../../tool/api-helper';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class CreationReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CreationReact.i18n[languageHelper()];
  }


  componentDidMount() {
    if (!isLogin()) {
      this.props.history.push('/login');
    }
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div style={{background: '#F3F5F7'}}>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.title}>
              我的创作
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex" style={{marginBottom: '2.03vw'}}>
                <div style={{marginRight: '1.875vw'}}>
                  <CreationCard text={'文章'} unit={'篇'} logo={article} type={'article'} url={'article'} />
                </div>
                {/*<div>*/}
                {/*<CreationCard text={'短则'} unit={'条'} logo={comment} type={'editorial'} url={'review'} />*/}
                {/*</div>*/}
              </div>
              <div className="d-flex" style={{marginBottom: '8.03vw'}}>
                <div>
                  <CreationCard text={'回答'} unit={'条'} logo={answer} type={'answer'} url={'answer'} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

CreationReact.i18n = [
  {},
  {}
];

CreationReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Creation = CreationReact;
