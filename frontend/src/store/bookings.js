import { csrfFetch } from "./csrf";

const LOAD = "bookings/LOAD";
const LOAD_TYPES = "bookings/LOAD_TYPES";
const ADD_ONE = "bookings/ADD_ONE";

const load = (list) => ({
	type: LOAD,
	list,
});

const loadTypes = (types) => ({
	type: LOAD_TYPES,
	types,
});

const addOneBooking = (booking) => ({
	type: ADD_ONE,
	booking,
});

export const getBookings = () => async (dispatch) => {
	const response = await fetch(`/api/me/bookings`);

	if (response.ok) {
		const list = await response.json();
		dispatch(load(list));
	}
};

export const getBookingDetail = (id) => async (dispatch) => {
	const response = await fetch(`/api/spots/${id}`);

	if (response.ok) {
		const booking = await response.json();
		dispatch(addOneBooking(booking));
	}
};
export const createBooking = (payload) => async (dispatch) => {
    let spotId = payload.spotId
	let response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});
	console.log('making api request: ',payload)
	if (response.ok) {
		const newGuy = await response.json();
		dispatch(addOneBooking(newGuy));
		return newGuy
	}
};

export const editBooking = (payload) => async (dispatch) => {
	let response = await fetch(`/api/spots/${payload.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});
	//console.log('making api request: ',payload)
	if (response.ok) {
		const newGuy = await response.json();
		dispatch(addOneBooking(newGuy));
		return newGuy
	}
};




const initialState={}

const bookingsReducer = (state = initialState, action) => {
	let newState
    switch (action.type) {
		case LOAD:
			//console.log(action.list)
            newState=action.list
            return newState
        case ADD_ONE:
            //console.log('action spot: ',action.spot)
            //console.log('state: ',state.spot)
            if (!state[action.booking.id]) {
			 newState = {
					...state,
					[action.booking.id]: action.booking,
				};
                //console.log(newState)
				
				newState.Bookings.push(action.bookings);
				
				return newState;
			}
            return {
				...state,
				[action.booking.id]: {
					...state[action.booking.id],
					...action.booking,
				}}
		default:
			return state;
	}
};

export default bookingsReducer;