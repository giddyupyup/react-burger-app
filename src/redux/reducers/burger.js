import { INIT_INGREDIENTS, INIT_INGREDIENTS_FAILED, ADD_INGREDIENT, REMOVE_INGREDIENT, RESET_BURGER } from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

const INGREDIENT_ORDER = {
  salad: null,
  bacon: null,
  cheese: null,
  meat: null
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case INIT_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...INGREDIENT_ORDER,
          ...action.ingredients
        },
        totalPrice: initialState.totalPrice,
        error: false,
        building: false
      };
    case INIT_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    case ADD_INGREDIENT:

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
        building: true
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      };
    case RESET_BURGER:
      return {
        ...initialState
      }
    default:
      return state;
  }
}
