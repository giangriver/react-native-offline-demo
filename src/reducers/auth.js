import * as actions from '../actions/actionType';

const initialState = {
  username: null,
  password: null,
  user: null,
  error: null,
  loading: false,
  form: null,
  isLogged: false,
  currentUser: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        username: payload.username,
        password: payload.password,
      };
    case actions.LOGIN_SUCCESS:
      return {
        username: null,
        password: null,
        user: payload,
        loading: false,
        error: null,
      };
    case actions.LOGIN_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case actions.GET_USER_LOCAL_SUCCESS:
      return {
        isLogged: payload.isLogged,
        currentUser: payload.currentUser,
      };
    case actions.GET_USER_LOCAL_FAILED:
      return {
        isLogged: false,
        currentUser: null,
      };
    case actions.SET_USER:
      return {
        isLogged: true,
        currentUser: payload,
      };
    case actions.LOGOUT:
      return {
        isLogged: false,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default authReducer;
