import './SpotDetails.css';
import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotDetail, getSpots } from '../../store/spots';
import { getBookings, getBookingDetail } from '../../store/bookings';
import NewBooking from "../NewBookingForm/NewBookingForm"
const SpotDetails = () => {
    const dispatch= useDispatch();

    const { spotId } = useParams();
    const [newForm, setNewForm]=useState('false')
    const [showingNewForm, setShowingNewForm]=useState('')
   
    const userId = useSelector(state => state.session.user['id'])
    useEffect(() => {
        dispatch(getSpots())
        dispatch(getSpotDetail(spotId))
        dispatch(getBookingDetail(spotId))
      }, [dispatch]);
    const spot = useSelector(state => state.spots);
    console.log("spot.spots: ",spot.Spots)
      let thisSpot
       const bookingz = useSelector(state => state.bookings.this);
       
      console.log("spot Id: ",spotId)
      let bookings = []
      if (bookingz && bookingz.Bookings){
        console.log("bookinz: ",bookingz.Bookings)
          bookingz.Bookings.forEach((el)=>{
            if (el.spotId==spotId){
                bookings.push(el)
            }
          }
          )
        }
    //     console.log("bookinz: ",bookingz)
    //     console.log("spot Id: ",spotId)
       console.log("bookings: ",bookings)
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
        Owner ID: {
        thisSpot.ownerId===userId ? (<>You own this spot, you cannot book it</>) : (<>{thisSpot.ownerId}</>)
        }
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
        {bookings && spot.Spots && bookings.length ? (
            <>
    <div>Following Dates Are Not available:</div>
    <ul>
    {bookings.map((booking)=>(
    <>
     
     <li>{booking.startDate} --- {booking.endDate}</li>
     
     </>
     ))}
    </ul>
  </>) : (
      <>Not Booked, All Dates Available!</>
  )}


    
         
        </>
    )
}

export default SpotDetails;