import './HomePage.css';
import { getSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';



function Home(){
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getSpots())
    }, [dispatch])
    const spots = useSelector(state => {
        return state.spots.Spots;
      });
      console.log(spots)
    



 
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser && spots) {
    sessionLinks = (
        <>
      
        <h1>Spots:</h1>
     <ul>
        {spots.map((spot)=>(
     <li>
   <NavLink key={spot.id} to={`/spots/${spot.id}`}>{spot.name}</NavLink> </li>))}
   </ul>
      </>
    );
  } else  if (!sessionUser && spots){
    sessionLinks = (
      <>
      
      <h1>Spots:</h1>
   <ul>
      {spots.map((spot)=>(
   <li>
   <NavLink key={spot.id} to={`/login`}>{spot.name}</NavLink>
   </li>))}
   </ul>
      </>
    );
  }

  return(
    <ul>
      <li>
        {sessionLinks}
    
      </li>
    </ul>
  );
}



export default Home;
