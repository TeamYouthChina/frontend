import React from 'react';
import {
  MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBListGroup, MDBListGroupItem, MDBRow
} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import filter from '../../assets/filter.svg';

import {CollectionSidebar} from '../../component/collection-card';
import {CompanyCardBarId} from '../../card/company-card-bar-id';
import {getAsync} from '../../../../tool/api-helper';
import {languageHelper} from '../../../../tool/language-helper';

const basicCHNFont = {
  fontFamily: 'PingFang SC',
  fontStyle: 'normal',
  fontWeight: 'normal',
  lineHeight: 'normal'
};

const navyFont = {
  ...basicCHNFont,
  color: '#31394D'
};

// todo,动态显示结果数
class SearchCompanyResultReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      collectionType: 'company',
      collectionNum: null
    };
    // i18n
    this.text = SearchCompanyResultReact.i18n[languageHelper()];
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.collectionNum !== this.state.collectionNum;
  // }

  async componentDidMount() {
    try {
      const result = await getAsync(`/users/${localStorage.getItem('id')}/attentions?type=${this.state.collectionType}`);
      if (result && result.status && result.status === 2000) {
        this.setState(() => {
          return {collectionNum: result.content.length};
        });
      } else {
        this.setState(() => {
          return {collectionNum: 0};
        });
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
    this.props.handleSearchType();
  }

  render() {
    return (
      <div className="cell-wall">
        <div className="cell-membrane">
          {this.props.backend ?
            (this.props.backend.status && this.props.backend.status.code === 2000 ?
              (this.props.backend.content.data.map((item, index) => (
                <MDBRow key={index} style={{margin: '1rem 0rem'}}>
                  <p>{item.content.id}</p>
                </MDBRow>
              )))
              : <p>Here should be a loading card.</p>)
            : null}

          <MDBRow style={{marginTop: '2vw'}}>
            <main className={classes.mainBody}>
              <MDBRow style={{marginBottom: '1.2vw'}}>
                <MDBCol
                  size="2" className="px-0 d-flex justify-content-center align-items-center"
                  style={{color: '#8D9AAF', fontSize: '1.09vw'}}>
                  5个结果
                </MDBCol>
                <MDBCol className="ml-auto d-flex justify-content-end" size="2">
                  <MDBDropdown>
                    <MDBDropdownToggle
                      className={`m-0 ${classes.dropdownButton}`} size="sm"
                      style={{fontSize: '1.1vw', border: '1px solid #DBE5F7'}}>
                      相关性 <img className={classes.filter} src={filter} alt="icons" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu basic>
                      <MDBDropdownItem className={classes.dropdownItems}>规则1</MDBDropdownItem>
                      <MDBDropdownItem className={classes.dropdownItems}>规则2</MDBDropdownItem>
                      <MDBDropdownItem className={classes.dropdownItems}>规则3</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <CompanyCardBarId id={'1'} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <CompanyCardBarId id={'1'} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <CompanyCardBarId id={'1'} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <CompanyCardBarId id={'1'} />
                </MDBCol>
              </MDBRow>
              <MDBRow className={classes.cardBarRow}>
                <MDBCol>
                  <CompanyCardBarId id={'1'} />
                </MDBCol>
              </MDBRow>
            </main>

            <aside className={classes.sideBar}>
              <CollectionSidebar number={this.state.collectionNum} collectionType="公司" />
              <MDBListGroup
                style={{fontSize: '1.1vw', marginTop: '1.56vw'}}>
                <MDBListGroupItem
                  className={classes.listGroupItemsTag}
                >
                  <p style={navyFont}>标签</p>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={classes.listGroupItems}
                >
                  <button className={classes.tagBtn}>求职技巧</button>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={classes.listGroupItems}
                >
                  <button className={classes.tagBtnSelected}>面试经历</button>
                </MDBListGroupItem>
                <MDBListGroupItem
                  className={classes.listGroupItems}
                  style={{height: '10vh'}} />
              </MDBListGroup>
            </aside>

          </MDBRow>
        </div>
      </div>
    );
  }
}

SearchCompanyResultReact.i18n = [
  {},
  {}
];

SearchCompanyResultReact.propTypes = {
  // self

  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleSearchType: PropTypes.func.isRequired,
  backend: PropTypes.object.isRequired
};

export const SearchCompanyResult = withRouter(SearchCompanyResultReact);
