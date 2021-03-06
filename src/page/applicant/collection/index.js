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
import {isLogin} from '../../../tool/api-helper';
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
  

  componentDidMount() {
    if(!isLogin()){
      this.props.history.push('/login');
    }
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
                <CollectionCard text={'职位'} unit={'份'} logo={job} type={'job'} url={'job'}/>
              </div>
              <div>
                <CollectionCard text={'公司'} unit={'家'} logo={company}  type={'company'} url={'company'}/>
              </div>
            </div>
            <div className="d-flex" style={{marginBottom:'2.03vw'}}>
              <div style={{marginRight:'1.875vw'}}>
                <CollectionCard text={'文章'} unit={'篇'} logo={article} type={'article'} url={'article'}/>
              </div>
              <div>
                <CollectionCard text={'短则'} unit={'条'}logo={comment} type={'editorial'} url={'review'}/>
              </div>
            </div>
            <div className="d-flex" style={{marginBottom:'8.03vw'}}>
              <div style={{marginRight:'1.875vw'}}>
                <CollectionCard text={'回答'}  unit={'条'}logo={answer} type={'answer'} url={'answer'}/>
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
