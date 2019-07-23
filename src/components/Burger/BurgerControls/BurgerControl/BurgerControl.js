import React from 'react';
import CSSClasses from './BurgerControl.module.css';

function BurgerControl(props) {
  return (
    <div className={CSSClasses.BurgerControl}>
      <div className={CSSClasses.Label}>{props.label}</div>
      <button className={CSSClasses.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
      <button className={CSSClasses.More} onClick={props.added}>More</button>
    </div>
  );
}

export default BurgerControl;
