import React from 'react';
import CSSClass from './Spinner.module.css';

function Spinner(props) {
  return (
    <div className={CSSClass.Loader}>Loading...</div>
  );
}

export default Spinner;
