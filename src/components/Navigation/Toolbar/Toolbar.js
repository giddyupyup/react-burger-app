import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import CSSClasses from './Toolbar.module.css';

function Toolbar(props) {
  return (
    <header className={CSSClasses.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={CSSClasses.Logo}><Logo /></div>
      <nav className={CSSClasses.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
}

export default Toolbar;
