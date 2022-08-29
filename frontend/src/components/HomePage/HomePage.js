import './HomePage.css';
import { getSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';



function Home(){
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getSpots())
    }, [])
    const spots = useSelector(state => {
        return state.spots.Spots;
      });
      console.log(spots)

const mapper = () => {
  if(spots){  
return spots.map((spot)=>{
    <NavLink key={spot['id']} to={`/spots/${spot['id']}`}>{spot['name']}</NavLink>
})
}}
console.log(mapper())
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (!sessionUser) {
    sessionLinks = (
        <NavLink to="/login">Not logged in, this Link (not a spot)</NavLink>
    );
  } else {
    sessionLinks = (
      <>
      
        <NavLink to="/login">Logged In, this link (will be a spot)</NavLink>
       {mapper()}
      </>
    );
  }

  return (
    <ul>
      <li>
       
        {sessionLinks}
      </li>
    </ul>
  );
}



export default Home;
