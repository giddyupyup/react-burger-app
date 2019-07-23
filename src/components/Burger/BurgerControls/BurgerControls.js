import React from 'react';
import BurgerControl from './BurgerControl/BurgerControl';
import CSSClasses from './BurgerControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

function BurgerControls(props) {
  return (
    <div className={CSSClasses.BurgerControls}>
      <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
      {
        controls.map(ctrl => (
          <BurgerControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]} />
        ))
      }
      <button
        className={CSSClasses.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ? 'Order Now' : 'Sign Up To Order'}</button>
    </div>
  );
}

export default BurgerControls;
