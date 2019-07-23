import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error:  null,
  loading: false,
  authenticated: false,
  authRedirectPath: '/'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
        authenticated: true
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        ...initialState
      };
    case SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path
      }
    default:
      return { ...state };
  }
}
