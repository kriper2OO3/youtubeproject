import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link, Navigate } from "react-router-dom";

function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:7000')
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true)
                setName(res.data.name)
              
            } else {
                setAuth(false)
                setMessage(res.data.Error)
            }
        })
        .then(err => console.log(err));
    }, [])
    return (
        <div className='container mt-4'>
            <Navigate to='/videos'/>
            {
                auth ?
                <div>
                    <h3>Вы авторизованы --- {name}</h3>
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>Авторизоваться</h3>
                    <Link to="/login" className='btn btn-primary'>Войти</Link>
                </div>
            }
        </div>
    );
}

export default Home