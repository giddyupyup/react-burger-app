import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import CSSClasses from './Logo.module.css';

function Logo(props) {
  return (
    <div className={CSSClasses.Logo}>
      <img src={burgerLogo} alt="MyBurger" />
    </div>
  );
}

export default Logo;
