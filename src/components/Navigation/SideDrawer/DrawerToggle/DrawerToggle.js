import React from 'react';
import CSSClass from './DrawerToggle.module.css';

function DrawerToggle(props) {
  return (
    <div onClick={props.clicked} className={CSSClass.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default DrawerToggle;
