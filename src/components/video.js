import React from 'react';
const Video = ({ videoSrcURL, videoTitle }) => (
  <div className="video">
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
      modestbranding="1"
      rel="0"
      controls="0"
      width="100%"
      height="350"
    />
  </div>
);
export default Video;
