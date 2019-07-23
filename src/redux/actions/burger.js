import { INIT_INGREDIENTS, INIT_INGREDIENTS_FAILED, ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_BURGER } from './actionTypes';
import Axios from '../../axios-orders';

export function getInitIngredients () {
  return function (dispatch) {
    Axios.get('/ingredients.json')
          .then(response => {
            dispatch({type: INIT_INGREDIENTS, ingredients: response.data});
          })
          .catch(error => {
            dispatch({type: INIT_INGREDIENTS_FAILED});
          });
  };
}

export function resetBurger () {
  return {
    type: RESET_BURGER
  }
}

export function addIngredients (ingredient) {
  return {
    type: ADD_INGREDIENT,
    ingredient: ingredient
  };
}

export function removeIngredients (ingredient) {
  return {
    type: REMOVE_INGREDIENT,
    ingredient: ingredient
  };
}
