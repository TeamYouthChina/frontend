import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {getAsync} from '../../../tool/api-helper';
import {ArticleCardBarId} from '../../../general-component/article-card-bar-id';

class CompanyArticleReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = CompanyArticleReact.i18n[languageHelper()];
    // style
  }
  async componentDidMount() {
    
    this.setState({
      render: 1,
      backend:await getAsync(`/search?type=article&title=${this.state.keyword}&limit=3&page=0`)
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
                文章
              </p>
              <br/>
              {this.state.backend.content.data.map((item, index) => {
                return (
                  <div style={{marginBottom:'1vw'}} key={index}>
                    <ArticleCardBarId
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

CompanyArticleReact.i18n = [
  {},
  {}
];

CompanyArticleReact.propTypes = {
  // self
  keyword: PropTypes.string.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const CompanyArticle = withRouter(CompanyArticleReact);
