import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MDBIcon} from 'mdbreact';


const Title = (props) => (
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <Link  to={{
      pathname:'/question/0/answer/0',
    }}>
      <strong style={{color: '#31394D', fontSize: '1.406vw', ...props.basicFont}}>{props.title}</strong>
    </Link>
    <MDBIcon style={{justifyContent: 'flex-end'}} icon="ellipsis-h"/>
  </div>
  
);

Title.defaultProps = {
  title: '123',
  basicFont:{
    fontFamily: 'PingFang SC',
    lineHeight: 'normal'
  }
};

Title.propTypes = {
  // self
  title: PropTypes.string.isRequired,
  basicFont:PropTypes.object.isRequired,

};

export default Title;
