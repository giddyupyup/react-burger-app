import { firebaseInstance as Axios } from '../../axios-orders';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } from './actionTypes';

function authStart () {
  return {
    type: AUTH_START
  };
}

function authSuccess (data) {
  return {
    type: AUTH_SUCCESS,
    payload: {
      token: data.idToken,
      userId: data.localId
    }
  };
}

function authFail (error) {
  return {
    type: AUTH_FAIL,
    payload: {
      error: error
    }
  };
}

function checkAuthentication (expirationTime) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export function setAuthRedirect (path) {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path: path
  };
}

export function logout () {
  localStorage.removeItem('token');
  localStorage.removeItem('localId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT
  };
}

export function authenticate (email, password, isSignup) {
  return function (dispatch) {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }
    let url = '/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCsEMGpomulNETbUBeKk0PGQ8SVNdbjj5k';
    if (!isSignup) {
      url = '/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCsEMGpomulNETbUBeKk0PGQ8SVNdbjj5k'
    }
    Axios.post(url, authData)
        .then(response => {
          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
          localStorage.setItem('token', response.data.idToken);
          localStorage.setItem('localId', response.data.localId);
          localStorage.setItem('expirationDate', expirationDate);
          dispatch(authSuccess(response.data));
          dispatch(checkAuthentication(response.data.expiresIn));
        })
        .catch(error => {
          dispatch(authFail(error.response.data.error));
        });
  }
}

export function authCheckState () {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const localId = localStorage.getItem('localId');
        dispatch(authSuccess({
          idToken: token,
          localId: localId
        }));
        dispatch(checkAuthentication((expirationDate.getTime() - new Date().getTime()) / 1000));
      }

    }
  };
}
