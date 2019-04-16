import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { MDBAutocomplete } from 'mdbreact';

import { languageHelper } from '../../../tool/language-helper';
import { removeUrlSlashSuffix } from '../../../tool/remove-url-slash-suffix';
import Select from '../general-component/select-with-search/select-with-search';
// import { select } from 'glamor';
// import * as tim from '../../../tim/sdk/webim';
// import * as json2 from '../../../tim/sdk/json2';
// import {webimLogin} from '../../../tim/js/login/login';

class ZepeiReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      date: [new Date(), new Date()],
      options: [
        // {id: 1, label: "Alabama"},{id: 2, label: "Alaska"}
        'Alabama', 'Alaska'        
      ]
    };
    // i18n
    this.text = ZepeiReact.i18n[languageHelper()];
  }

  onChange = date => {
    this.setState({ date });
  };

  handleSelectChange = () => {
    
    // console.log(selected);
  };

  logValue = () => {
    // console.log(value);
  };

  render() {
    const pathname = removeUrlSlashSuffix(this.props.location.pathname);
    if (pathname) {
      return <Redirect to={pathname} />;
    }
    let id = 1400184624;
    let sig =
      'eJxlj1FPgzAYRd-5FYTXGfdRqFlM9oAMJ0lxIW7G*UIaWliZQG3LmFv870bUiPG*nnNzc8*WbdvOmjxc0jxvu8Zk5k1yx762HXAufqGUgmXUZJ5i-yA-SqF4RgvD1QBdjDECGDuC8caIQnwbG82VP8Ka7bNh46vvA7gz-wr9UUQ5wCRKw3jJp3HxWAXBiTAiYUHyoDvBKix36eRusSTlfVSVU3zc40MgbspeSzl5UUlDSbjqk81a*W0dv1b0dkujZ9W1qE41PO22-Xw*mjSi5j*HwMPIn40vHbjSom0GAYGLXeTBZxzr3foAMUZdvg__';
    let imURL = `http://127.0.0.1:8080?id=${id}&sig=${sig}`;
    return (
      <div>
        <div className="cell-wall">
          <div className="cell-membrane">
            <div
              style={{
                textAlign: 'center',
                padding: '30px 30px',
                boxSizing: 'border-box',
              }}
            >
              <iframe
                frameBorder="0"
                src={imURL}
                style={{
                  height: `${((1032 * 0.55) / 1280) * 100}vw`,
                  width: `${((1761 * 0.55) / 1280) * 100}vw`,
                }}
              />
            </div>

            <DateRangePicker onChange={this.onChange} value={this.state.date} />
            <Select
              title="学校名称"
              handleSelectChange={this.handleSelectChange}
              items={[
                {
                  checked: false,
                  disabled: false,
                  icon: null,
                  text: '乔治华盛顿大学',
                  value: '1',
                },
                {
                  checked: false,
                  disabled: false,
                  icon: null,
                  text: '加州大学圣地亚哥大学',
                  value: '2',
                },
                {
                  checked: false,
                  disabled: false,
                  icon: null,
                  text: '北京王府学校',
                  value: '3',
                },
              ]}
            />
            <MDBAutocomplete
              data={this.state.options}
              label="Choose your favorite state"
              clear
              id="input"
              getValue={this.logValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

ZepeiReact.i18n = [{}, {}];

ZepeiReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const Zepei = ZepeiReact;
