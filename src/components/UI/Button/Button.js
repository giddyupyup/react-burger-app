import React from 'react';
import CSSClasses from './Button.module.css';

function Button(props) {
  return (
    <button
      disabled={props.disabled}
      className={[CSSClasses.Button, CSSClasses[props.btnType]].join(" ")}
      onClick={props.clicked}>{props.children}</button>
  );
}

export default Button;
