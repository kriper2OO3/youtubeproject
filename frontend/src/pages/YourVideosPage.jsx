import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoForList from '../components/VideoForList';
import './VideoList.css'

const YourVideoPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchVideos = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + "/yourvideos", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setVideos(response.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <h1>Все ваши видео</h1>
      <ul className='videos'>
        {videos.map(video => ( <VideoForList key={video.id} {...video} /> ))}
      </ul>
    </>
  );
};


export default YourVideoPage;