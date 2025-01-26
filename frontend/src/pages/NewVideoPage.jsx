import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import './NewVideoPage.css';

const NewVideoPage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [error, setError] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePreviewChange  = (e) => {
    setPreviewFile(e.target.files[0]);
  };
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !previewFile) {
      setError('Выберите видео и превью.');
      return;
    }
    if (!name) {
      setError('Введите название видео.');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);
    formData.append('preview', previewFile);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(process.env.REACT_APP_API_URL + "/newvideo", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      navigate('/yourvideos')
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  };

  return (
    <div className="new-video-page">
    <h1>Загрузить новое видео</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название видео</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        <label>Описание видео</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label>Выберите видео</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          required
        />
      </div>
      <div>
        <label>Выберите изображение для превью</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePreviewChange}
          required
        />
      </div>
      <div>
        <button type="submit">Загрузить видео</button>
      </div>
    </form>
  </div>
  );
};

export default NewVideoPage;