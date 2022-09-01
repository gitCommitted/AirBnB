import './SpotDetails.css';
import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetail, getSpots } from '../../store/spots';

const SpotDetails = () => {
    const dispatch= useDispatch();

    const { spotId } = useParams();
    
    
    useEffect(() => {
        dispatch(getSpots())
        dispatch(getSpotDetail(spotId))
      }, []);
    const spot = useSelector(state => state.spots);
    console.log("spot.spots: ",spot.Spots)
      let thisSpot
    
if (spot.Spots){
    spot.Spots.forEach((el)=>{
        if(el.id==spotId){
            thisSpot=el
        }
    })
}
console.log("thisSpot: ",thisSpot)
let deets
if (spot.Spots){
    deets = (
    <>
        <div>SpotDetails</div>
        <ul>
        <li>
        Name: {thisSpot.name}
    </li>
     <li>
        Id: {thisSpot.id}
    </li>
    <li>
        Price: {thisSpot.price}
    </li>
    <li>
        Description: {thisSpot.description}
    </li>
    <li>
        Address: {thisSpot.address}
    </li>
    <li>
        City: {thisSpot.city}
    </li>
    <li>
        State: {thisSpot.state}
    </li>
   
    
    <li>
        Owner: {thisSpot.ownerId}
    </li>
   </ul>
   <NavLink to={`/${thisSpot.id}/bookings`}>Book this spot now!</NavLink>
      </>
    )
}

    return (
        <>
        {deets}
       
        </>
    )
}

export default SpotDetails;