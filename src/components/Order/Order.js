import React from 'react';
import CSSClass from './Order.module.css';

export default function Order (props) {
  const ingredients = [];

  for (const ingredient in props.ingredients) {
    if (props.ingredients.hasOwnProperty(ingredient)) {
      const amount = props.ingredients[ingredient];
      ingredients.push({
        name: ingredient,
        amount: amount
      });
    }
  }

  const ingredientOutput = ingredients.map(ig => {
    return <span
            style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #CCC',
              padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount}) </span>;
  });

  return (
    <div className={CSSClass.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  );
}
