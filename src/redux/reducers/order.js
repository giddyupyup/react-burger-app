import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_TRY,
  PURCHASE_BURGER_INIT,
  FETCH_ORDER_INIT,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL
} from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  error: null,
  purchased: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PURCHASE_BURGER_INIT:
      return {
        ...state,
        purchased: false
      }
    case PURCHASE_BURGER_TRY:
      return {
        ...state,
        loading: true
      }
    case PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.payload.order,
        id: action.payload.id
      }
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true
      };
    case PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case FETCH_ORDER_INIT:
      return {
        ...state,
        loading: true
      }
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      }
    case FETCH_ORDER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}