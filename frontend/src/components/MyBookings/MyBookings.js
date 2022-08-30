import './MyBookings.css';
import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBookings } from '../../store/bookings';
import { getSpots } from '../../store/spots';
const MyBookings = () => {
    const dispatch= useDispatch();

    
    
    
    useEffect(() => {
        dispatch(getBookings())
        
      }, [dispatch]);
    const bookings = useSelector(state => state.bookings.Bookings);
   
console.log(bookings)



let deets
if (bookings ){
deets = (
<>
    <div>You're Booking Details</div>
    <ul>
    {bookings.map((booking)=>(
        <>
     <li>Place: {booking.Spot.name}</li>
     <li>Start Date: {booking.startDate}</li>
     <li>End Date: {booking.endDate}</li>
     <NavLink to={`/editbookings`}>Edit Booking</NavLink>
     </>
     ))}
 
</ul>

  </>
)
}

return (
    <>
    {deets}
   
    </>
)
}

export default MyBookings;