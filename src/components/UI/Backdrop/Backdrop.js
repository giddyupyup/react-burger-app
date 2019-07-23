import React from 'react';
import CSSClasses from './Backdrop.module.css';

function Backdrop(props) {
  return props.show ? <div className={CSSClasses.Backdrop} onClick={props.clicked}></div> : null;
}

export default Backdrop;
