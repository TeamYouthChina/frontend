import React from 'react';
import Player from 'griffith';
const sources = {
  hd: {
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
  },
  sd: {
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
  },
};

const VideoPlayers = () => (
  <Player sources={sources} />
);

export default VideoPlayers;
