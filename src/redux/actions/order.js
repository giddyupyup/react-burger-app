import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_TRY,
  PURCHASE_BURGER_INIT,
  FETCH_ORDER_INIT,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL
} from './actionTypes';
import { resetBurger } from './burger';
import Axios from '../../axios-orders';

export function purshaseBurgerHandler (order, token) {
  return function (dispatch) {
    dispatch({type: PURCHASE_BURGER_TRY});
    Axios.post('/orders.json?auth=' + token, order)
          .then(response => {
            dispatch(resetBurger());
            dispatch(purchaseBurgerSuccess(response.data.name, order))
            dispatch(purchaseInit());
          })
          .catch(error => {
            dispatch(purchaseBurgerFail(error));
          });
  };
}

export function fetchOrders (token, userId) {
  return function (dispatch) {
    dispatch({type: FETCH_ORDER_INIT});
    const q = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    Axios.get('/orders.json' + q)
          .then(response => {
            const fetchedOrders = [];
            for (const key in response.data) {
              if (response.data.hasOwnProperty(key)) {
                const order = response.data[key];
                fetchedOrders.push({
                  ...order,
                  id: key
                });
              }
            }
            dispatch(fetchOrderSuccess(fetchedOrders));
          })
          .catch(error => {
            dispatch(fetchOrderFail(error));
          });
  };
}

export function purchaseInit () {
  return {
    type: PURCHASE_BURGER_INIT
  };
}

function purchaseBurgerSuccess (id, order) {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    payload: {
      id: id,
      order: order
    }
  };
}

function purchaseBurgerFail (error) {
  return {
    type: PURCHASE_BURGER_FAIL,
    payload: {
      error: error
    }
  };
}

function fetchOrderSuccess (orders) {
  return {
    type: FETCH_ORDER_SUCCESS,
    orders: orders
  };
}

function fetchOrderFail (error) {
  return {
    type: FETCH_ORDER_FAIL,
    error: error
  };
}
