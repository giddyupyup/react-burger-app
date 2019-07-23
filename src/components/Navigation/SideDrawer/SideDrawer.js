import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import CSSClasses from './SideDrawer.module.css';

function SideDrawer(props) {
  let attachedClasses = [CSSClasses.SideDrawer, CSSClasses.Close];
  if (props.open) {
    attachedClasses = [CSSClasses.SideDrawer, CSSClasses.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={CSSClasses.Logo}><Logo /></div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
}

export default SideDrawer;
