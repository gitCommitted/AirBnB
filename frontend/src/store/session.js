import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { email, password } = user;
  const response = await csrfFetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };


  export const signup = (user) => async (dispatch) => {
    const { userName, email, password } = user;
    const response = await csrfFetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        userName,
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log('dispatching to set user: ', data)
    dispatch(setUser(data));
    return response;
  };


  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      console.log('new state from set-user: ',newState)
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;