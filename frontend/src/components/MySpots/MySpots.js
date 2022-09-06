import './MySpots.css';
import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSpots, editSpot, removeSpot, createSpot } from '../../store/spots';
const MySpots = () => {
    const dispatch= useDispatch();
    const spots1 = useSelector(state => state.spots.Spots);
    const user = useSelector(state=>state.session.user.id)
    const [editForm, setEditForm]=useState('false')
    const [showingEditForm, setShowingEditForm]=useState('')
    const [newForm, setNewForm]=useState('false')
    const [showingNewForm, setShowingNewForm]=useState('')
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
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        dispatch(getSpots()),
        //console.log('dispatch from form')
        setAddress(''),
        setCity(''),
        setState(''),
        setCountry(''),
        setLat(''),
        setLng(''),
        setName(''),
        setDescription(''),
        setPrice('')
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
const linkerE = (id) => {
    return (
        <button 
        type="submit"
        onClick = {(e) => 
            {
                editForm === 'true' ? setEditForm('false') : setEditForm('true')
                setShowingEditForm(id)
                //console.log(showingEditForm)
                //console.log(editForm)
            }
        }
        >Edit</button>
    )
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
        >Create New Spot</button>
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
    .then(() => setEditForm('false'))
    .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
}
const handleSubmitN = (e) => {
    e.preventDefault();
    setErrors([]);
    return  dispatch(createSpot({ address,city,state,country,lat,lng,name,description,price }))
    .then(() => setNewForm('false'))
    .catch(async (res) => {
        const data = await res.json();
        console.log(data)
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
}
const showEditForm = (newSpotId) => {
    spotId=newSpotId
    return(
<form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Street Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Latitude
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label>
        Longitude
        <input
          type="text"
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
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Edit spot</button>
      <button 
      onClick = {(e) => setEditForm('false')}
      >Cancel</button>
    </form>
    )
}
const showNewForm = (newSpotId) => {
    spotId=newSpotId
    return(
<form onSubmit={handleSubmitN}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Street Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        City
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        State
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Latitude
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label>
        Longitude
        <input
          type="text"
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
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create New Spot</button>
      <button 
      onClick = {(e) => setNewForm('false')}
      >Cancel</button>
    </form>
    )
}

let deets
if (spots && spots.length){
deets = (
<>
    <div>You're spot Details</div>
    <ul>
    {spots.map((spot)=>(
        
    <>
     <li>Name: {spot.name}</li>
     <li>Description: {spot.description}</li>
     <li>Price: {spot.price}</li>
     <li>Address: {spot.address}</li>
     <li>City: {spot.city}</li>
     <li>State: {spot.state}</li>
     <li>Country: {spot.country}</li>
     <li>Latitude: {spot.lat}</li>
     <li>Longitude: {spot.lng}</li>
     
     {editForm === 'true' && showingEditForm === spot.id ? showEditForm(spot.id) : linkerE(spot.id)}
     <button 
      onClick = {(e) => handleDelete(spot.id)}
      >Delete</button>
     </>
     ))}
    </ul>
  </>
)
}
if (!spots || !spots.length){
    deets=(
        <div>You've Got No spots</div>
    )
}
return (
    <>
    {deets}
    {newForm === 'true' ? showNewForm() : linkerN()}
    </>
)
}


export default MySpots;