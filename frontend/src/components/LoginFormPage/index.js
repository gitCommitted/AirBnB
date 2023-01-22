// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage({setShowModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const history = useHistory()
  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        
        const data = await res.json();
        console.log(data)
        if (data && data.message) setErrors([data.message]);
      });
  
  }

  return (
    <form onSubmit={handleSubmit} className='modal-container'>
      <ul>
       
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      
      </ul>
      <label className='modal-input-title-label' htmlFor='email'>
        Email
      </label>
        <input
        className='modal-input-title'
        name='email'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      
      <label className='modal-input-title-label' htmlFor='password'>
        Password
      </label>
        <input
        className='modal-input-title'
        name='password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
  
      <button type="submit" className='login-btn modal-btn modal-submit-btn'>Log In</button>
      <div className='modalPadding'>
      <button className='login-btn modal-btn modal-submit-btn' onClick={(e)=>
      {
      setEmail('demo@user.io')
      setPassword('password')
      }
      }>Click here to login as a demo user</button>
      </div>
     
    </form>
  );
}

export default LoginFormPage;