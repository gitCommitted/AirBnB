// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
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
    let obj = dispatch(sessionActions.login({ email, password }))
    if (obj) {
       dispatch(sessionActions.restoreUser())
      history.push(`/`);
    }
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors);
      // });
  
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
        {console.log(errors)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;