import React from 'react';
import {MDBListGroup, MDBListGroupItem} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';

import {EducationRadio} from './component/education';
import {MajorRadio} from './component/major';
import {CompanyRadio} from './component/company';
import {languageHelper} from '../../../../../tool/language-helper';

const basicCHNFont = {
  fontFamily: 'PingFang SC',
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 'normal'
};

const navyFont = {
  ...basicCHNFont,
};

class ConnectionFilterReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = ConnectionFilterReact.i18n[languageHelper()];
  }

  render() {
    return (
      <div>
        <MDBListGroup
          style={{fontSize: '1.1vw', marginLeft: '1.56vw'}}>
          <MDBListGroupItem
            className={classes.listGroupItemsTag}
          >
            <p style={navyFont}>筛选器</p>
          </MDBListGroupItem>
          <MDBListGroupItem className={classes.listGroupItems}>
            <div>
              <p className={classes.listGroupItemsSecondTag}>姓名</p>
              <input placeholder="请输入姓名" className={classes.listGroupInput} />
            </div>
          </MDBListGroupItem>
          
          <EducationRadio checked={true}/>
          
          <MajorRadio checked={true}/>
          
          <CompanyRadio checked={true}/>
          
          <MDBListGroupItem
            className={classes.listGroupItems}
            style={{height: '10vh'}} />
        </MDBListGroup>
      </div>
    );
  }
}

ConnectionFilterReact.i18n = [
  {},
  {}
];

ConnectionFilterReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export const ConnectionFilter = withRouter(ConnectionFilterReact);
