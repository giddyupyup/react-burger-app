import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';
import CSSClasses from './Modal.module.css';

function Modal(props) {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
      className={CSSClasses.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1': '0'
      }}>
        {props.children}
      </div>
    </Aux>
  );
}

function areEqual(prevProps, nextProps) {
  return nextProps.show === prevProps.show &&
         nextProps.children === prevProps.children;
}

export default React.memo(Modal, areEqual);
