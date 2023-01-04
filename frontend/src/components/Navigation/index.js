import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../HomePage/logo.png';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <NavLink to="/myspots" className='nav__buttons'>My Spots</NavLink>
      <NavLink to="/mybookings"className='nav__buttons'>My Bookings</NavLink>
      <ProfileButton user={sessionUser}className='nav__buttons' />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login" className='nav__buttons'>Log In</NavLink>
        <NavLink to="/signup" className='nav__buttons'>Sign Up</NavLink>
        <a className='nav__buttons' target="_blank" href="https://github.com/gitCommitted/AirBnB-Clone">About</a>
      </>
    );
  }

  return (
    <ul className='nav__group'>
      <li>
      
        <p className='logo'>not airbnb</p>
        <img className='logo1' src={logo}  alt="no image available"/>
        
        <NavLink exact to="/" className='nav__buttons'>Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;