import React from 'react';
import PropTypes from 'prop-types';
import article from './article.png';
import answer from './answer.png';
import classes from './index.module.css';
import comment from './comment.png';
import company from './company.png';
import job from './job.png';
import {Redirect} from 'react-router-dom';
import {CollectionCard} from './card';
import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

class CollectionReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CollectionReact.i18n[languageHelper()];
  }

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (
      <div style={{background:'#F3F5F7'}}>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            <div className={classes.title}>
              我的收藏
            </div>
            <div className="d-flex" style={{marginBottom:'2.03vw'}}>
              <div style={{marginRight:'1.875vw'}}>
                <CollectionCard text={'职位'} logo={job} tag={'16份职位'} url={'job'}/>
              </div>
              <div>
                <CollectionCard text={'公司'} logo={company} tag={'7家公司'} url={'company'}/>
              </div>
            </div>
            <div className="d-flex" style={{marginBottom:'2.03vw'}}>
              <div style={{marginRight:'1.875vw'}}>
                <CollectionCard text={'文章'} logo={article} tag={'4篇文章'} url={'article'}/>
              </div>
              <div>
                <CollectionCard text={'短则'} logo={comment} tag={'16条短则'}/>
              </div>
            </div>
            <div className="d-flex" style={{marginBottom:'8.03vw'}}>
              <div style={{marginRight:'1.875vw'}}>
                <CollectionCard text={'回答'} logo={answer} tag={'12条回答'} url={'answer'}/>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

CollectionReact.i18n = [
  {},
  {}
];

CollectionReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Collection = CollectionReact;
