import reducer from './auth';
import { AUTH_SUCCESS } from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error:  null,
  loading: false,
  authenticated: false,
  authRedirectPath: '/'
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchObject(initialState)
  });

  it('should store the token upon login', () => {
    expect(reducer(initialState, {
      type: AUTH_SUCCESS,
      payload: {
        token: 'some-token',
        userId: 'some-userId'
      }
    })).toMatchObject({
      ...initialState,
      token: 'some-token',
      userId: 'some-userId',
      authenticated: true
    })
  });
});
