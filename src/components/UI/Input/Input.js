import React from 'react';
import CSSClass from './Input.module.css';

export default function Input (props) {
  let inputElement = null;
  const inputClasses = [CSSClass.InputElement]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(CSSClass.Invalid);
  }

  switch ( props.elementType) {
    case ('input'):
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
      break;
    case ('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
      break;
    case ('select'):
      inputElement = (<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                        {
                          props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                          ))
                        }
                      </select>);
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
  }
  return (
    <div className={CSSClass.Input}>
      <label className={CSSClass.Label}>{props.label}</label>
      {inputElement}
    </div>
  )
}
