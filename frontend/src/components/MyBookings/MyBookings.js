import './MyBookings.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getBookings, editBooking, removeBooking } from '../../store/bookings';
import { Modal } from '../../context/Modal';
import placeholdr from "../HomePage/placeholdr.png"
const MyBookings = () => {
    const dispatch= useDispatch();
    const history = useHistory();
    const bookings = useSelector(state => state?.bookings?.Bookings);
    const sessionUser = useSelector(state => state.session?.user);
  if (!sessionUser){
    history.push("/")
  }
    
    const [editForm, setEditForm]=useState('false')
    const [showingEditForm, setShowingEditForm]=useState('')
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        dispatch(getBookings())
        //console.log('dispatch from form')
      }, [dispatch]);
      const editMode = (id) => {
        return (
          <>
          {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  {showEditForm(id)}
                </Modal>
              )}
          </>
        )
      }  
const linker = (booking) => {
    return (
      <>
        <button 
        type="submit"
        onClick = {(e) => 
            {
                //editForm === 'true' ? setEditForm('false') : setEditForm('true')
                setShowingEditForm(booking.id)
                setStartDate(booking.startDate)
                setEndDate(booking.endDate)
                setErrors([])
                //console.log(showingEditForm)
                //console.log(editForm)
                setShowModal(true)
            }
        }
        >Edit</button>
        {showingEditForm===booking.id ? editMode(booking.id) : null}
        </>
    )
}
const handleDelete = (booking) => {
    // const now = new Date()
    // const newEnd = new Date(booking?.endDate)
    // const newStart = new Date(booking?.startDate)
    // console.log(booking?.id)
    // console.log(now, newStart)
    // console.log(now.valueOf(), newStart.valueOf())
    return  dispatch(removeBooking(booking?.id))
    .then(() => dispatch(getBookings()))
}
let bookingId
const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return  dispatch(editBooking({ bookingId, startDate,endDate })).then(() => setShowModal(false))
    .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
}
const showEditForm = (newBookingId) => {
    bookingId=newBookingId
    return(
<form onSubmit={handleSubmit} className='modal-container'>
      <h3 className='modal-title'>Edit Booking</h3>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className='modal-input-title-label' htmlFor='start'>
        Start Date
        </label>
        <input
        className='modal-input-title'
        name='start'
          type="text"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      
      <label className='modal-input-title-label' htmlFor='end'>
        End Date
        </label>
        <input
        className='modal-input-title'
        name='end'
          type="text"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
     
      <button type="submit"
      className='login-btn modal-btn modal-submit-btn'
      >Edit Booking</button>
      {/* <button 
      onClick = {(e) => setEditForm('false')}
      >Cancel</button> */}
    </form>
    )
}
const isPast = (booking) => {
  
    let now = new Date()
    let newEnd = booking?.endDate
    let newStart = new Date(booking?.startDate)
    // console.log(now.valueOf(), newStart.valueOf())
    if (now.valueOf() >= newStart.valueOf()){
        return true
    } else {
        return false
    }
}

let deets

if (bookings && bookings.length){
deets = (
<>
    <div className='title'>Your Booking Details: </div>
    <div  className='theGrid'>
    {bookings.map((booking)=>(
    <ul className='box'>
       <img src={booking.Spot.previewImage ? booking.Spot.previewImage : placeholdr} alt="no image available"/> 
     <li>Place: {booking.Spot.name}</li>
     <li>Start Date: {booking.startDate}</li>
  
     <li>End Date: {booking.endDate}</li>
      <li>Price: ${booking.Spot.price}</li>
      <li className='messageB'>{
        isPast(booking) ? 'Note: You cannot modify or delete a booking after the start date' : null
        }</li>
     {isPast(booking) ? null : linker(booking)}
     {/* {editForm === 'true' && showingEditForm === booking.id ? showEditForm(booking.id) : linker(booking.id)} */}
     {editForm === 'true' 
     && showingEditForm === booking.id 
     || isPast(booking)
     ? null : (
      <button 
      onClick = {(e) => handleDelete(booking)}
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