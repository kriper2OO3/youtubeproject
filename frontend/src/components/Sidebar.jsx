import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import list from './list.svg';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {observer} from "mobx-react-lite"

export default function Sidebar() {
    const [visible, setVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const toggleSidebar = () => {
        setVisible(!visible)
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false); 
        navigate('/login')
    };

    return (
        <div className='sidebar'>
            <button onClick={toggleSidebar} className="sidebar-toggle">
                <img src={list} width="40" height="40"></img>
            </button>
            <div className={`sidebar ${visible ? 'visible' : ''}`}>
                <button onClick={toggleSidebar} className="close-btn">
                    &times;
                </button>
                <ul>
                    <li>
                        <Link to={'/'}>Главная</Link>
                    </li>
                    {isAuthenticated && (
                        <>
                            <li>
                                <Link to={'/yourvideos'}>Ваши видео</Link>
                            </li>
                            <li>
                                <Link to={'/newvideo'}>Добавить видео</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Выйти</button>
                            </li>
                        </>
                    )}
                    {!isAuthenticated && (
                        <li>
                            <Link to={'/login'}>Войти</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
