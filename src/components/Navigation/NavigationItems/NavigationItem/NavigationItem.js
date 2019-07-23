import React from 'react';
import { NavLink } from 'react-router-dom';
import CSSClasses from './NavigationItem.module.css';

function NavigationItem(props) {
  return (
    <li className={CSSClasses.NavigationItem}>
      <NavLink
        exact
        to={props.link}
        activeClassName={CSSClasses.active}>
        {props.children}
      </NavLink>
    </li>
  );
}

export default NavigationItem;
