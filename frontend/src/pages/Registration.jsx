import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Register() {
    const [values, setValues] = useState({
        login: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:7000/registration', values)
        .then(res => {
            if(res.data.token) {
                navigate('/login')
            }
        })
        .catch(err => {
            if (err.response) {
                alert(err.response.data.message);
            }
        });
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-white vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Зарегистрироваться</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="login"><strong>Логин</strong></label>
                        <input type="text" placeholder='Введите логин' name='login'
                        onChange={e => setValues({...values, login: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Пароль</strong></label>
                        <input type="password" placeholder='Введите пароль' name='password'
                        onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Зарегистрироваться</button>
                    <p>Вы согласны с нашими условиями и политикой</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Есть аккаунт?</Link>
                </form>
            </div>
        </div>
    )
}

export default Register