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
	let response = await fetch(`/api/spots`, {
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
	let response = await fetch(`/api/spots/${payload.id}`, {
		method: "PUT",
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


export const getspotTypes = () => async (dispatch) => {
	const response = await fetch(`/api/spots/types`);

	if (response.ok) {
		const types = await response.json();
		dispatch(loadTypes(types));
	}
};

const initialState={}

const spotsReducer = (state = initialState, action) => {
	let newState
    switch (action.type) {
		case LOAD:
			console.log(action.list)
            newState=action.list
            return newState
        case ADD_ONE:
            console.log('action spot: ',action.spot)
            console.log('state: ',state.spot)
            return {
				...state,
				[action.spot.id]: {
					...state[action.spot.id],
					...action.spot,
				}}
		default:
			return state;
	}
};

export default spotsReducer;