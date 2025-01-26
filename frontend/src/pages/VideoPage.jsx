import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import ReactPlayer from 'react-player'
import './VideoPage.css'

const VideoPage = ({ props }) => {
  const [video, setVideo] = useState(null);
  let { videoId } = useParams();
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/video/" + videoId);
        setVideo(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (!video) return <div>Загрузка...</div>;

  return (
    <div className="video-page">
      <div className="react-player-wrapper">
        <ReactPlayer url={process.env.REACT_APP_API_URL + '/' + video.path + '.mp4'} playing={false} controls={true}  width="100%" height="100%"/>
      </div>
      <h1>{video.name}</h1>
      <h2>{video.creator.login}</h2>
      <h3>{video.description}</h3>
  </div>
  );
};

export default VideoPage;