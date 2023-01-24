import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import {Link, NavLink, useHistory, Redirect} from 'react-router-dom'
import { Modal } from '../../context/Modal';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const sessionUser = useSelector(state => state.session?.user);
  const [showModal, setShowModal] = useState(false);
  if (!sessionUser) return (
    <Redirect to="/" />
  );

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };
  
  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);
  
  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    // setShowModal(false)
    // history.go('/')
    // console.log('looginp out')
    const res = await dispatch(sessionActions.logout())
 
    
    .then((res)=>{history.go('/')})
    return res
  };

const accounts = () => {
  return(
    <ul className="modal-container">
      <div className="modalPadding">
    <li className='modal-input-title-label'>Your Account:</li>
    </div>
    <li className="modal-input-title-label">User name: {user.userName}</li>
    <li className="modal-input-title-label">Email: {user.email}</li>
    <li><br/></li>
   <li>
   <a className='aRef' target="_blank" href="https://github.com/gitCommitted/AirBnB-Clone">About This App</a>
   </li>
    <li>
      <div className='modalPadding'>
        <div className='modalPadding'></div>
      <button 
      className="login-btn modal-btn modal-submit-btn"
      onClick={logout}>Log Out</button>
      </div>
    </li>
  </ul>
  )
}


  return (
    <>
      <a className='nav__buttons'
      onClick = {(e) => 
        {
            setShowModal(true)
        }
    }
      
      >
        My Account
      </a>
      {/* <a onClick={openMenu} className='nav__buttons'>
        My Account
      </a> */}
      {/* {showMenu && ( */}
        {/* // <ul className="profile-dropdown">
        //   <li>{user.userName}</li>
        //   <li>{user.email}</li>
        //  <li>
        //  <a target="_blank" href="https://github.com/gitCommitted/AirBnB-Clone">About</a>
        //  </li>
        //   <li>
        //     <button onClick={logout}>Log Out</button>
        //   </li>
        // </ul>
      
    //)} */}
    {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {accounts()}
        </Modal>
      )}
    </>
  );
}

export default ProfileButton;