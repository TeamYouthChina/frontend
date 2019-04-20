import React from 'react';
import {MDBCol, MDBRow} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';

import {UserCardBarAuth} from '../../card/user-card-bar-auth';
import {ConnectionFilter} from './filter';
import {languageHelper} from '../../../../tool/language-helper';

class SearchConnectionResultReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // i18n
    this.text = SearchConnectionResultReact.i18n[languageHelper()];
  }
  
  componentDidMount() {
    //搜索页面切换时，重新set搜索类型
    this.props.handleSearchType();
  }

  componentWillUnmount() {
    this.props.handleUnmount();
  }

  render() {
    return (
      <div className="cell-wall">
        <div className="cell-membrane">
          <MDBRow style={{marginTop: '2vw'}}>
            <MDBCol style={{marginLeft: 0, padding: 0}} size="2">
              <ConnectionFilter/>
            </MDBCol>
            
            <MDBCol className="px-0" size="10">
              <MDBRow className={classes.cardBarRow}>
                <MDBCol className="p-0">
                  <UserCardBarAuth id={'1'}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol className="p-0">
                  <UserCardBarAuth id={'1'}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol className="p-0">
                  <UserCardBarAuth id={'1'}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol className="p-0">
                  <UserCardBarAuth id={'1'}/>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol className="p-0">
                  <UserCardBarAuth id={'1'}/>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            
          </MDBRow>
        </div>
      </div>
    );
  }
}

SearchConnectionResultReact.i18n = [
  {},
  {}
];

SearchConnectionResultReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleSearchType: PropTypes.func.isRequired,
  handleUnmount: PropTypes.func.isRequired
};

export const SearchConnectionResult = withRouter(SearchConnectionResultReact);
