import React from 'react';
import CSSClasses from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

function BurgerIngredient(props) {
  let ingredient = null;

  switch(props.type) {
    case('bread-bottom'):
      ingredient = <div className={CSSClasses.BreadBottom}></div>;
      break;
    case('bread-top'):
      ingredient = (
        <div className={CSSClasses.BreadTop}>
          <div className={CSSClasses.Seeds1}></div>
          <div className={CSSClasses.Seeds2}></div>
        </div>
      );
      break;
    case('meat'):
      ingredient = <div className={CSSClasses.Meat}></div>;
      break;
    case('cheese'):
      ingredient = <div className={CSSClasses.Cheese}></div>;
      break;
    case('salad'):
      ingredient = <div className={CSSClasses.Salad}></div>;
      break;
    case('bacon'):
      ingredient = <div className={CSSClasses.Bacon}></div>;
      break;
    default:
      ingredient = null;
  }

  return ingredient;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;
