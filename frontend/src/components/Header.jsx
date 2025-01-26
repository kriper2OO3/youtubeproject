import React, { useState } from 'react';
import './Header.css';
import { Link, Navigate } from "react-router-dom";
import logo from './logo.png';
import Sidebar from './Sidebar';

export default function Header() {
    return (
        <div className='header'>
            <div className='header_left'>
                <Sidebar />
            </div>
            <div className='header_logo'>
                <Link to='/'>
                    <img src={logo} width="170" height="70"></img>
                </Link>
            </div>
        </div>
    )
}
