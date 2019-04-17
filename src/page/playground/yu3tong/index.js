import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {languageHelper} from '../../../tool/language-helper';
import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

const NotoSansFont = {fontFamily: '"Noto Sans CJK SC", sans-serif'};
const NotoSerifFont = {fontFamily: 'Noto Sans CJK SC'};
const Heiti = {fontFamily: '"Hiragino Sans GB"'};

class Yu3tongReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = Yu3tongReact.i18n[languageHelper()];
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
            <p className="display-4">以后就在这里做测试了～</p>
            <br />
            <p style={{...NotoSerifFont, fontSize: '14px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...Heiti, fontSize: '16px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...NotoSerifFont, fontSize: '18px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...NotoSerifFont, fontSize: '24px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...NotoSerifFont, fontSize: '28px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...NotoSerifFont, fontSize: '32px'}}>JavaScript是世界上最好的语言。</p>
            <h5 style={{...NotoSerifFont}}>JavaScript是世界上最好的语言。</h5>
            <h4 style={{...NotoSerifFont}}>JavaScript是世界上最好的语言。</h4>
            <h3 style={{...NotoSerifFont}}>JavaScript是世界上最好的语言。</h3>
            <h2 style={{...NotoSerifFont}}>JavaScript是世界上最好的语言。</h2>
            <h1 style={{...Heiti}}>JavaScript是世界上最好的语言。</h1>
            <br />
            <p style={{...NotoSansFont, fontSize: '14px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...NotoSansFont, fontSize: '16px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...NotoSansFont, fontSize: '18px', fontWeight: '500'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...NotoSansFont, fontSize: '24px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...NotoSansFont, fontSize: '28px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...NotoSansFont, fontSize: '32px'}}>JavaScript是世界上最好的语言。</p>
            <p style={{...Heiti, fontSize: '32px'}}>JavaScript是世界上最好的语言。</p>
            <h5 style={{...NotoSansFont}}>JavaScript是世界上最好的语言。</h5>
            <h4 style={{...NotoSansFont}}>JavaScript是世界上最好的语言。</h4>
            <h3 style={{...NotoSansFont}}>JavaScript是世界上最好的语言。</h3>
            <h2 style={{...NotoSansFont}}>JavaScript是世界上最好的语言。</h2>
            <h1 style={{...NotoSansFont}}>JavaScript是世界上最好的语言。</h1>
          </div>
        </div>
      </div>
    );
  }
}

Yu3tongReact.i18n = [
  {},
  {}
];

Yu3tongReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const Yu3tong = Yu3tongReact;
