import React, {useState} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../HomePage/logo.png';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

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
        {/* <NavLink to="/login" className='nav__buttons'>Log In</NavLink> */}
        <Link onClick={() => setShowModal2(true)} className='nav__buttons'>
          Log In
      </Link>
      {showModal2 && (
        <Modal onClose={() => setShowModal2(false)}>
          <LoginFormPage setShowModal={setShowModal2} />
        </Modal>)}

        {/* <NavLink to="/signup" className='nav__buttons'>Sign Up</NavLink> */}
        <Link onClick={() => setShowModal(true)} className='nav__buttons'>
          Sign Up
      </Link>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage setShowModal={setShowModal} />
        </Modal>)}
        <a className='nav__buttons' target="_blank" href="https://github.com/gitCommitted/AirBnB-Clone">About</a>
      </>
    );
  }

  return (
    <ul className='nav__group'>
      <li>
      <div id="logoGroup">
        <p className='logo'>NOT AirBnB</p>
        <img className='logo1' src={logo}  alt="no image available"/>
        </div>
        <NavLink exact to="/" className='nav__buttons'>Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;