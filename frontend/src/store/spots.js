import { csrfFetch } from "./csrf";

const LOAD = "spot/LOAD";
const LOAD_TYPES = "spot/LOAD_TYPES";
const ADD_ONE = "spot/ADD_ONE";

const load = (list) => ({
	type: LOAD,
	list,
});

const loadTypes = (types) => ({
	type: LOAD_TYPES,
	types,
});

const addOneSpot = (spot) => ({
	type: ADD_ONE,
	spot,
});

export const getSpots = () => async (dispatch) => {
	const response = await fetch(`/api/spots`);

	if (response.ok) {
		const list = await response.json();
		dispatch(load(list));
	}
};

export const getSpotDetail = (id) => async (dispatch) => {
	const response = await fetch(`/api/spots/${id}`);

	if (response.ok) {
		const spot = await response.json();
		dispatch(addOneSpot(spot));
	}
};
export const createSpot = (payload) => async (dispatch) => {
	let response = await csrfFetch(`/api/spots`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});
	console.log('making api request: ',payload)
	if (response.ok) {
		const newGuy = await response.json();
		dispatch(addOneSpot(newGuy));
		return newGuy
	}
};

export const editSpot = (payload) => async (dispatch) => {
	let response = await csrfFetch(`/api/spots/${payload.spotId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});
	//console.log('making api request: ',payload)
	if (response.ok) {
		const newGuy = await response.json();
		dispatch(addOneSpot(newGuy));
		return newGuy
	}
};
export const removeSpot = (id) => async (dispatch) => {
  
	let response = await csrfFetch(`/api/spots/${id}`, {
		method: "DELETE",
	
	});
	//console.log('making api request: ',payload)
	if (response.ok) {
		const newGuy = await response.json();
		//dispatch(addOneBooking(newGuy));
		return newGuy
	}
};

const initialState={}

const spotsReducer = (state = initialState, action) => {
	let newState
    switch (action.type) {
		case LOAD:
			//console.log(action.list)
            newState=action.list
            return newState
        case ADD_ONE:
            //console.log('action spot: ',action.spot)
            //console.log('state: ',state.spot)
			console.log('old state: ',state)
            console.log('state Bookings: ',state.Spots)
            console.log('book id',action.spot.id)
            console.log('state at index',state.Spots[action.spot.id])
            //if (!state[action.booking.id])
            let exists=false
            let index
            state.Spots.forEach((el,ind)=>{
                if (el.id==action.spot.id){
                    exists=true
                    index=ind
                }
            })
            if(exists){
                newState=state
                newState.Spots[index]=action.spot
                return newState
            }
            if(!exists){
            newState = state
           newState.Spots.push(action.spot)
           return newState
            }
            // return {
			// 	...state,
			// 	[action.spot.id]: {
			// 		...state[action.spot.id],
			// 		...action.spot,
			// 	}}
		default:
			return state;
	}
};

export default spotsReducer;