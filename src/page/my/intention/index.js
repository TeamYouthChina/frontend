import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';

import {isLogin} from '../../../tool/api-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';
import {AdvantageTag} from './component';

//import classes from "../file/index.module.css";

class IntentionReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      backend:null,
      render:0
    };
    // i18n
    this.text = IntentionReact.i18n[languageHelper()];
  }
  async componentDidMount(){
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
      <div>
        <div
          className="cell-wall"
        >
          <div
            className="cell-membrane"
          >
            {/*<div className={classes.title}>*/}
            {/*优势标签*/}
            {/*</div>*/}
            <AdvantageTag />

          </div>
        </div>
      </div>
    );


  }
}

IntentionReact.i18n = [
  {},
  {}
];

IntentionReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const Intention = IntentionReact;
