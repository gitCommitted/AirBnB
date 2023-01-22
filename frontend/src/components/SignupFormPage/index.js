import './SignupForm.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage({setShowModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, userName, password }))
        .catch(async (res) => {
          const data = await res.json();
          //console.log(data)
          if (data && data.errors) setErrors(Object.values(data.errors));
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

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
      <label className='modal-input-title-label' htmlFor='userName' >
        UserName
      </label>
        <input
        className='modal-input-title'
        name='userName'
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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
      <label className='modal-input-title-label' htmlFor='confirmPassword'>
        Confirm Password
      </label>
        <input
        className='modal-input-title'
        name='confirmPassword'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

      <button type="submit" className='login-btn modal-btn modal-submit-btn'
      >Sign Up</button>
    </form>
  );
}

export default SignupFormPage;