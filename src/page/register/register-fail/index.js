import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';
import {MDBContainer, MDBModal, MDBModalBody, MDBModalFooter} from 'mdbreact';

export const RegisterFailPrompt = (props) => (
  <MDBContainer>
    <MDBModal isOpen={props.isOpen} toggle={props.toggle} centered>
      <MDBModalBody>
        <p className={classes.prompt}>{props.prompt}</p>
      </MDBModalBody>
      <MDBModalFooter>
        <button
          onClick={props.toggle}
          className={classes.btn}>关闭
        </button>
      </MDBModalFooter>
    </MDBModal>
  </MDBContainer>
);

RegisterFailPrompt.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  prompt: PropTypes.string.isRequired
};
