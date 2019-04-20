import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../tool/remove-url-slash-suffix';
import bg from './company-card/Rectangle 8.png';
import classes from './index.module.css';

import {CompanyArticle} from './company-article';
import {CompanyCard} from './company-card';
import {CompanyDesci} from './company-descri';
import {CompanyJob} from './company-job';
import {CompanyPic} from './company-pic';
import {CompanyQuestion} from './company-question';
import {CompanyReview} from './company-review';


import {getAsync} from '../../tool/api-helper';

class CompanyReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      
    };
    // i18n
    this.text = CompanyReact.i18n[languageHelper()];
  }

  async componentDidMount() {

    this.setState({
      backend: await getAsync(`/companies/${this.props.match.params.id}`)
    });
    
  }


  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return (<Redirect to={pathname} />);
    }
    return (this.state.backend && this.state.backend.status.code.toString().startsWith('2')) ? (
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
                <CompanyJob id={this.state.backend.content.id}/>
                <CompanyReview keyword={this.state.backend.content.name}/>
                <CompanyQuestion keyword={this.state.backend.content.name}/>
                <CompanyArticle keyword={this.state.backend.content.name}/>
                <CompanyPic backend={this.state.backend}/>
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
    ):null;
  }
}

CompanyReact.i18n = [
  {},
  {}
];

CompanyReact.propTypes = {
  // self
  
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Company = CompanyReact;
