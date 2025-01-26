import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoForList from '../components/VideoForList';
import './VideoList.css'

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/videos");
        setVideos(response.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <h1>Все видео</h1>
      <ul className='videos'>
        {videos.map(video => ( <VideoForList key={video.id} {...video} /> ))}
      </ul>
    </>
  );
};

export default VideoList;