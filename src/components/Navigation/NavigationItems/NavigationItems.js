import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import CSSClasses from './NavigationItems.module.css';


function NavigationItems(props) {
  const { isAuthenticated } = props;
  return (
    <ul className={CSSClasses.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      { isAuthenticated
          ? <NavigationItem link="/orders">Orders</NavigationItem>
          : null
      }
      {
        !isAuthenticated
          ? <NavigationItem  link="/auth">Authenticate</NavigationItem>
          : <NavigationItem link="/logout">Logout</NavigationItem>
      }
    </ul>
  );
}

export default NavigationItems;