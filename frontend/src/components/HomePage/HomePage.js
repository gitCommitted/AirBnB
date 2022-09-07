import './HomePage.css';
import { getSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import placeholder from '../HomePage/placeholdr.png';


function Home(){
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getSpots())
    }, [dispatch])
    const spots = useSelector(state => {
        return state.spots.Spots;
      });
      //console.log(spots)
    



 
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser && spots) {
    sessionLinks = (
        <>
      
      <h1 className='title'> All Spots:</h1>
      <ul className='theGrid'>
        {spots.map((spot)=>(
     <li className='card'>
   <NavLink className='card2' key={spot.id} to={`/spots/${spot.id}`}>
     {spot.name}
     <img src={placeholder} alt="placeholder image"/>
     </NavLink> </li>))}
   </ul>
      </>
    );
  } else  if (!sessionUser && spots){
    sessionLinks = (
      <>
      
      <h1 className='title'> All Spots:</h1>
   <ul className='theGrid'>
      {spots.map((spot)=>(
   <li className='card'>
     
   <NavLink className='card2' key={spot.id} to={`/login`}>
     {spot.name}
     <img src={placeholder} alt="placeholder image"/>
     </NavLink>
   </li>))}
   </ul>
      </>
    );
  }

  return(
    <ul className='homepage'>
      <li>
        {sessionLinks}
    
      </li>
    </ul>
  );
}



export default Home;
