import './MyBookings.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBookings, editBooking, removeBooking } from '../../store/bookings';

const MyBookings = () => {
    const dispatch= useDispatch();
    const bookings = useSelector(state => state.bookings.Bookings);
    const [editForm, setEditForm]=useState('false')
    const [showingEditForm, setShowingEditForm]=useState('')
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        dispatch(getBookings())
        //console.log('dispatch from form')
      }, [dispatch]);
   
const linker = (id) => {
    return (
        <button 
        type="submit"
        onClick = {(e) => 
            {
                editForm === 'true' ? setEditForm('false') : setEditForm('true')
                setShowingEditForm(id)
                setStartDate('')
                setEndDate('')
                setErrors([])
                //console.log(showingEditForm)
                //console.log(editForm)
            }
        }
        >Edit</button>
    )
}
const handleDelete = (id) => {
    console.log(id)
    return  dispatch(removeBooking(id))
    .then(() => dispatch(getBookings()))
}
let bookingId
const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return  dispatch(editBooking({ bookingId, startDate,endDate })).then(() => setEditForm('false'))
    .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
}
const showEditForm = (newBookingId) => {
    bookingId=newBookingId
    return(
<form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
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
      <button type="submit">Edit Booking</button>
      <button 
      onClick = {(e) => setEditForm('false')}
      >Cancel</button>
    </form>
    )
}

let deets
if (bookings && bookings.length){
deets = (
<>
    <div className='title'>Your Booking Details: </div>
    <div  className='theGrid'>
    {bookings.map((booking)=>(
    <ul className='box'>
     <li>Place: {booking.Spot.name}</li>
     <li>Start Date: {booking.startDate}</li>
     <li>End Date: {booking.endDate}</li>
     {editForm === 'true' && showingEditForm === booking.id ? showEditForm(booking.id) : linker(booking.id)}
     {editForm === 'true' && showingEditForm === booking.id ? null : (
      <button 
      onClick = {(e) => handleDelete(booking.id)}
      >Delete</button>
     )}
     
     </ul>
     ))}
   </div>
  </>
)
}
if (!bookings || !bookings.length){
    deets=(
        <div className='title'>You've Got No Bookings</div>
    )
}
return (
    <>
    {deets}
    </>
)
}

export default MyBookings;