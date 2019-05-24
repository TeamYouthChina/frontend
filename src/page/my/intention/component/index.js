import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import classes from './index.module.css';
import {MDBIcon,MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,MDBInput} from 'mdbreact';
import {Tag} from './tag';
import {languageHelper} from '../../../../tool/language-helper';

class AdvantageTagReact extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {
      modal1:false
    };
    // i18n
    this.text = AdvantageTagReact.i18n[languageHelper()];
    // style
  }
  toggle = nr => () => {
    let modalNumber = 'modal' + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  render() {
    return (
      <div>
        <div className={classes.content}>
          <p className={classes.name}>
            求职标签
          </p>
          <div className="d-flex justify-content-start" >
            <div className={classes.type1} onClick={this.toggle(1)}>
              <MDBIcon icon="plus" />
            </div>
            <Tag/>
            <Tag/>
            <Tag/>
          </div>
        </div>
        <MDBModal isOpen={this.state.modal1} toggle={this.toggle(1)} size="lg" centered>
          <MDBModalHeader toggle={this.toggle(1)}>添加标签</MDBModalHeader>
          <MDBModalBody>
            <div className="mb-3">
              <MDBInput hint="搜索我的标签" type="text" containerClass="mt-0 mx-2" />
            </div>
            <div className="d-flex justify-content-start">
              <Tag/>
              <Tag/>
              <Tag/>
            </div>
            
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle(1)}>关闭</MDBBtn>
            <MDBBtn color="primary">保存</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

AdvantageTagReact.i18n = [
  {},
  {}
];

AdvantageTagReact.propTypes = {
  // self
  backend: PropTypes.object.isRequired,
  // React Router
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const AdvantageTag = withRouter(AdvantageTagReact);
