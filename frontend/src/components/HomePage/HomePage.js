import './HomePage.css';
import { getSpots } from '../../store/spots';
import { NavLink, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import placeholder from '../HomePage/placeholdr.png';
import { Modal } from '../../context/Modal';
import LoginFormPage from '../LoginFormPage';


function Home(){
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getSpots())
    }, [dispatch])
    const spots = useSelector(state => {
        return state.spots.Spots;
      });
      //console.log(spots)
    



  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const loginSpots = (spot) => {
    return (
      <>
   <li>
     <img src={spot.previewImage ? spot.previewImage : placeholder} alt="no image available"/>
     </li>
     <li>{spot.name}</li>
      <li>{spot.city}, {spot.state}</li>
      <li>${spot.price}</li>
        </>
    )
     }
  let sessionLinks;
  if (sessionUser && spots) {
    sessionLinks = (
        <>
      
      <h1 className='title'> All Spots:</h1>

      <ul className='theGrid'>
        {spots.map((spot)=>(
     <li className='card'>
     
   <NavLink className='card2' key={spot.id} to={`/spots/${spot.id}`}>
     
     
     
 <li>
     <img src={spot.previewImage ? spot.previewImage : placeholder} alt="no image available"/>
      </li>
     <li>{spot.name}</li>
      <li>{spot.city}, {spot.state}</li>
      <li>${spot.price}</li>
     
     
     </NavLink> </li>))}
  
   </ul>
      </>
    );
  } else  if (!sessionUser && spots){
    sessionLinks = (
      <>
      
      <h1 className='title'> All Spots:</h1>
      <Link onClick={() => setShowModal(true)}>
   <ul className='theGrid'>
      {spots.map((spot)=>(
   <li className='card'>
    <div className='card2' key={spot.id}>

    
     {loginSpots(spot)}
     </div>
   </li>))}
   </ul>
   </Link>
     {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage setShowModal={setShowModal} />
        </Modal>)}
      </>
    );
  }

  return(
    <ul className='homepage'>
      <li>
        {sessionLinks}
    
      </li>
    </ul>
  );
}



export default Home;
