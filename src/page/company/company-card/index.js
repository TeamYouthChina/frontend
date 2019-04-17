import React from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';


import classes from './index.module.css';
import {languageHelper} from '../../../tool/language-helper';
import {IfCollect} from '../../playground/general-component/if-collect';




class CompanyCardReact extends React.Component {
  constructor(props) {
    super(props);
    // state
   
    // i18n
    this.text = CompanyCardReact.i18n[languageHelper()];
    // style
  }
  
  render() {
    return (
      <div className={classes.companycard}>
        <div>
          <img
            src={(this.props.backend.content.avatarUrl)?(this.props.backend.content.avatarUrl):('https://frontendpic.oss-us-east-1.aliyuncs.com/%E5%85%AC%E5%8F%B8.png')}
            alt="no img"
            className="img-fluid p-0 float-right"
            style={{
              width:'5.7vw',
              height:'auto',
            }}
          />
        </div>
        <div
          style={{
            marginLeft:'2.25vw',
            width:'47.25vw'
          }}>
          <div>
            <p
              style={{
                fontFamily: 'PingFang SC',
                lineHeight: 'normal',
                fontSize: '1.875vw',
                fontWeight:'bolder',
                color: '#454F69',
                marginBottom:'0.39vw'
              }}
            >
              {this.props.backend.content.name}
            </p>
            <p
              style={{
                fontFamily: 'PingFang SC',
                lineHeight: 'normal',
                fontSize: '0.875rem',
                color: '#8D9AAF',
                marginBottom:'0.39vw'
              }}
            > {this.props.backend.content.location} 
            </p>
            <p
              style={{
                fontFamily: 'PingFang SC',
                lineHeight: 'normal',
                fontSize: '1rem',
                color: '#454F69',
                margin:'0'

              }}
            >
              <a href={this.props.backend.content.website}>{this.props.backend.content.website}</a>
            </p>
          </div>

        </div>
        <div
          style={{
            justifyContent:'flex-end',
            alignSelf:'flex-end'
          }}
        >
          <IfCollect
            id={this.props.backend.content.id}
            type={2}
            ifcollect={this.props.backend.content.collected}
          />
        </div>

      </div>
    );
  }
}

CompanyCardReact.i18n = [
  {},
  {}
];

CompanyCardReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired
};

export const CompanyCard = withRouter(CompanyCardReact);
