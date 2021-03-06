import React from 'react';
import PropTypes from 'prop-types';

export const VideoShow = (props) => (
  <video controls style={{width:'27vw',height:'14.7vw'}}>
    <source src={`${props.videoId}.mp4`} type="video/mp4" />
  </video>
);

VideoShow.propTypes = {
  videoId: PropTypes.number.isRequired,
};
