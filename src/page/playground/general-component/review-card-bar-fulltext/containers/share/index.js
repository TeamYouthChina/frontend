import React from 'react';
import PropTypes from 'prop-types';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from 'mdbreact';

const Share = React.memo((props) =>(
  <MDBContainer>
    <MDBModal isOpen={props.showShare} toggle={props.onShare}>
      <MDBModalHeader>当前页面路径</MDBModalHeader>
      <MDBModalBody>
        {props.type === 'fromQuestion' ? `${props.content}/answer/${props.id}` : props.content}
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={props.onShare}>Close</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  </MDBContainer>
));

Share.propTypes = {
  onShare: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  showShare: PropTypes.bool.isRequired,
  type: PropTypes.string,
  id: PropTypes.number,
};

Share.displayName = 'shareComponent';

export default Share;
