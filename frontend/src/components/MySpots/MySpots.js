import './MySpots.css';
import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots, editSpot, removeSpot, createSpot } from '../../store/spots';
import { Modal } from '../../context/Modal';
import placeholdr from '../HomePage/placeholdr.png';
const MySpots = () => {
    const dispatch= useDispatch();
    const history = useHistory();
    const spots1 = useSelector(state => state?.spots?.Spots);
    const user = useSelector(state=>state?.session?.user?.id)
  const sessionUser = useSelector(state => state.session?.user);
  if (!sessionUser){
    history.push("/")
  }

    const [editForm, setEditForm]=useState('false')
    const [showingEditForm, setShowingEditForm]=useState('')
    const [newForm, setNewForm]=useState('false')
    const [showingNewForm, setShowingNewForm]=useState('')

    const [showModal, setShowModal] = useState(false);
    const [showModalN, setShowModalN] = useState(false);



    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setImage] = useState('');
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        dispatch(getSpots());
        //console.log('dispatch from form')
        
      }, []);
console.log(spots1)

console.log(user)
let spots = []
if (spots1){
spots1.forEach((el)=>{
    console.log(el)
    if (el.ownerId==user){
spots.push(el)
    }
})
}
console.log(spots)
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
// const newMode = (id) => {
//   return (
//     <>
//     {showModal && (
//           <Modal onClose={() => setShowModal(false)}>
//             {showEditForm(id)}
//           </Modal>
//         )}
//     </>
//   )
// }
const linkerE = (spot) => {
    return (
      <>
        <button 
        type="submit"
        onClick = {(e) => 
            {
                setAddress(spot.address);
                setCity(spot.city);
                setState(spot.state);
                setCountry(spot.country);
                setLat(spot.lat);
                setLng(spot.lng);
                setName(spot.name);
                setDescription(spot.description);
                setPrice(spot.price);
                setErrors([]);
                //editForm === 'true' ? setEditForm('false') : setEditForm('true')
                setShowingEditForm(spot.id)
                //console.log(showingEditForm)
                //console.log(editForm)
                setShowModal(true)
                console.log("modal spot id: ",spot.id)
            }
        }
        >Edit</button>
        {showingEditForm===spot.id ? editMode(spot.id) : null}
        </>
    )
}
const linkerN = () => {
    return (
      <div className='create_spot'>
        <button 
        className='spot_button'
        type="submit"
        onClick = {(e) => 
            {
                setAddress('');
                setCity('');
                setState('');
                setCountry('');
                setLat('');
                setLng('');
                setName('');
                setDescription('');
                setPrice('');
                setImage('');
                setErrors([]);
                //newForm === 'true' ? setNewForm('false') : setNewForm('true')
               
                //console.log(showingEditForm)
                //console.log(editForm)
                setShowModalN(true)
            }
        }
        >Create New Spot</button>
        {showModalN && (
          <Modal onClose={() => setShowModalN(false)}>
            {showNewForm()}
          </Modal>
        )}
        </div>
    )
}
const handleDelete = (id) => {
    console.log(id)
    return  dispatch(removeSpot(id))
    .then(() => dispatch(getSpots()))
}
let spotId
const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return  dispatch(editSpot({ spotId,address,city,state,country,lat,lng,name,description,price }))
    // .then(() => setEditForm('false'))
    .then(()=>setShowModal(false))
    .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
}
const handleSubmitN = (e) => {
    e.preventDefault();
    // setErrors([]);

    const createdSpot =  dispatch(createSpot( {address,city,state,country,lat,lng,name,description,price,previewImage} ))
    .then((res) => {
      console.log(".then1: ",res)
      setShowModalN(false)
    })
    .catch(async (res) => {
        const data = res;
        console.log(".catch err: ",data)
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
    return createdSpot
}
const showEditForm = (newSpotId) => {
    spotId=newSpotId
    return(
<form onSubmit={handleSubmit} className='modal-container'>
      <h3 className='modal-title'>Edit Spot</h3>  
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className='title-label' >
        Street Address
     
        <input
          
          name='addy'
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label className='title-label'  >
        City
     
        <input
          
          name='city'
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
     </label>
      <label className='title-label' >
        State
      
        <input
          
          name='state'
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
     </label>
      <label className='title-label'>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label className='title-label'>
        Latitude
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label className='title-label'>
        Longitude
        <input
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label>
      <label className='title-label'>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className='title-label'>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label className='title-label'>
        Price
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <div className='modalPadding'></div>
      <button type="submit"
      className='login-btn modal-btn modal-submit-btn'
      >Edit spot</button>
      {/* <button 
      onClick = {(e) => setEditForm('false')}
      >Cancel</button> */}
    </form>
    )
}
const showNewForm = (newSpotId) => {
    spotId=newSpotId
    return(
<form onSubmit={handleSubmitN}>
      <h3>Create A New Spot</h3>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Street Address
        <input
          type="text"
          placeholder='street number and name'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          placeholder='city name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          placeholder='state'
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          placeholder='country name'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Latitude
        <input
          type="text"
          placeholder='between -90 and 90'
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label>
        Longitude
        <input
          type="text"
          placeholder='between -180 and 180'
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label>
      <label>
        Name
        <input
          type="text"
          value={name}
          placeholder='name for spot'
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          value={description}
          placeholder='describe spot'
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          type="text"
          value={price}
          placeholder='enter price'
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <div className='image-title'>Add Image (optional)</div>
      <input
          className='modal-input-title file-btn'
          id='imageButton'
          type='file'
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
      <button type="submit">Create This Spot</button>
      {/* <button 
      onClick = {(e) => setNewForm('false')}
      >Cancel</button> */}
    </form>
    )
}

let deets
if (spots && spots.length){
deets = (
<>
    <div className='create_spot'>You're Spot Details:</div>
    <div  className='theGrid' id="grid2">
    
    {spots.map((spot)=>(
        
        
          <ul className='boxer'>
         <img src={spot.previewImage ? spot.previewImage : placeholdr} alt="no image available"/>   
     <li>Name: {spot.name}</li>
     <li>Description: {spot.description}</li>
     <li>Price: {spot.price}</li>
     <li>Address: {spot.address}</li>
     <li>City: {spot.city}</li>
     <li>State: {spot.state}</li>
     <li>Country: {spot.country}</li>
     <li>Latitude: {spot.lat}</li>
     <li>Longitude: {spot.lng}</li>
     {linkerE(spot)}
     {/* {editForm === 'true' && showingEditForm === spot.id ? showEditForm(spot.id) : linkerE(spot.id)} */}
     {editForm === 'true' && showingEditForm === spot.id ? null : (
      <button 
      onClick = {(e) => handleDelete(spot.id)}
      >Delete</button>
     )}
     
      </ul>
     
     ))}
    </div>
    
  </>
)
}
if (!spots || !spots.length){
    deets=(
        <div className='create_spot'>You've Got No Spots</div>
    )
}
return (
    <>
    {linkerN()}
    {/* {newForm === 'true' ? showNewForm() : linkerN()} */}
    {deets}
    </>
)
}


export default MySpots;