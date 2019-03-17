// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import {Redirect} from 'react-router-dom';

// import {languageHelper} from '../../../tool/language-helper';
// import {removeUrlSlashSuffix} from '../../../tool/remove-url-slash-suffix';

import HelloWorld from '../containers/hello-world.js';

const mapStateToProps = (state) => {
  return {
    testValue:state.zhenYiReducer.testValue
  };
};
// 这种包裹住的才是有props的
const Zhenyi = connect(mapStateToProps,null)(HelloWorld);

export default Zhenyi;


