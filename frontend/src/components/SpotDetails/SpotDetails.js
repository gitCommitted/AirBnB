import './SpotDetails.css';
import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetail, getSpots } from '../../store/spots';
import NewBooking from "../NewBookingForm/NewBookingForm"
const SpotDetails = () => {
    const dispatch= useDispatch();

    const { spotId } = useParams();
    const [newForm, setNewForm]=useState('false')
    const [showingNewForm, setShowingNewForm]=useState('')
    
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
const linkerN = () => {
    return (
        <button 
        type="submit"
        onClick = {(e) => 
            {
                newForm === 'true' ? setNewForm('false') : setNewForm('true')
               
                //console.log(showingEditForm)
                //console.log(editForm)
            }
        }
        >Book This Spot</button>
    )
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
   
      </>
    )
}

    return (
        <>
        {deets}
        {newForm === 'true' ? (
            <>
            <NewBooking spotId={spotId}/>
            <button onClick = {(e) => setNewForm('false')}>Cancel</button>
            </>
        ) : linkerN()}
         
        </>
    )
}

export default SpotDetails;