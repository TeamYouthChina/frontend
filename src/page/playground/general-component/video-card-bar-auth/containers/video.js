import React from 'react';
import PropTypes from 'prop-types';

export const VideoShow = (props) => (
  <video controls style={{width:'346px',height:'189px'}}>
    <source src={`${props.videoId}.mp4`} type="video/mp4" />
  </video>
)

VideoShow.propTypes = {
  videoId: PropTypes.number.isRequired,
};
