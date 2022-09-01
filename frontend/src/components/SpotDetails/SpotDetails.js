import './SpotDetails.css';
import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetail } from '../../store/spots';

const SpotDetails = () => {
    const dispatch= useDispatch();

    const { spotId } = useParams();
    
    
    useEffect(() => {
        dispatch(getSpotDetail(spotId))
      }, []);
    const spot = useSelector(state => state.spots);
    //console.log("spot: ",spot)
      let vals
    console.log(spot)
    if (spot[spotId]){
    vals = Object.values(spot[spotId])
    let keys = Object.keys(spot)
    console.log('values: ',vals)
    }
let deets
if (spot[spotId]){
    deets = (
    <>
        <div>SpotDetails</div>
        <ul>
        <li>
        Name: {vals[8]}
    </li>
     <li>
        Id: {vals[0]}
    </li>
    <li>
        Address: {vals[2]}
    </li>
    <li>
        City: {vals[3]}
    </li>
    <li>
        State: {vals[4]}
    </li>
    <li>
        Description: {vals[9]}
    </li>
    <li>
        Price: {vals[6]}
    </li>
   </ul>
   <NavLink to={`/${vals[0]}/bookings`}>Book this spot now!</NavLink>
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