import React from 'react';
import {
  MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBListGroup, MDBListGroupItem, MDBRow
} from 'mdbreact';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import filter from '../../assets/filter.svg';

import {CollectionSidebar} from '../../component/collection-card';
import {CardMapper} from '../../component/mapper';
import {DefaultCardMapper} from '../../component/default-mapper';
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
    };
    // i18n
    this.text = SearchCompanyResultReact.i18n[languageHelper()];
  }

  async componentDidMount() {
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
            <main className={classes.mainBody}>
              <MDBRow style={{marginBottom: '1.2vw'}}>
                <MDBCol
                  size="2" className="px-0 d-flex justify-content-center align-items-center"
                  style={{color: '#8D9AAF', fontSize: '1.09vw'}}>
                  {this.props.resultNum+'个结果'}
                </MDBCol>
                {
                  this.state.display?
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
                    </MDBCol> : null
                }
              </MDBRow>
              {
                this.props.backend && this.props.backend.length ?
                  (this.props.code === 2000 ? <CardMapper backend={this.props.backend}/> : 
                    (this.props.backend.status.code === 4040 ? <p>没有搜索结果。</p> : 
                      <p>Here should be a loading card.</p>)
                  ) : <DefaultCardMapper type={'companies'} handleResultNum={this.props.handleResultNum} />
              }
            </main>

            <aside className={classes.sideBar}>
              <CollectionSidebar  collectionType={'公司'} url={'company'} />
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
  handleUnmount: PropTypes.func.isRequired,
  handleResultNum: PropTypes.func.isRequired,
  backend: PropTypes.array.isRequired,
  code: PropTypes.number.isRequired,
  resultNum: PropTypes.number.isRequired,
};

export const SearchCompanyResult = withRouter(SearchCompanyResultReact);
