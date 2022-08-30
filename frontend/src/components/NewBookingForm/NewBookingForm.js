import './NewBookingForm.css';

import { useState, useEffect } from 'react';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createBooking } from '../../store/bookings'


    

const NewBooking = () => {

    const dispatch= useDispatch();
    const history = useHistory();
    let id = useParams();
   
    let spotId = Number(id.spotId)
    console.log(spotId)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);
    let newBook
    const spot = useSelector(state => state.spots);
    const userId = useSelector(state => state.session.user['id'])
    console.log(userId)
//console.log(spot)
    const handleSubmit = (e) => {
        e.preventDefault();
        
          setErrors([]);
          
            newBook=  dispatch(createBooking({ spotId, userId, startDate,endDate }))
              
            if (newBook){
            history.push(`/mybookings`)}
            
        //     .catch(async (res) => {
        //       const data = await res.json();
        //       //console.log(data)
        //       if (data && data.errors) setErrors(Object.values(data.errors));
        //     });
        
        // return setErrors(['Confirm Password field must be the same as the Password field']);
      };
let deets
if (spotId){
    deets=(
<form onSubmit={handleSubmit}>
      <ul>
       
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <h1>Book spot: {spotId}</h1>
      <label>
        Start Date
        <input
          type="text"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date
        <input
          type="text"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>

      <button type="submit">Book Now</button>
    </form>
    )}




    return (
       <>
       {deets}
       </> 
       
    )
}

export default NewBooking;