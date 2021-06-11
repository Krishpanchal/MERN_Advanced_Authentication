import React from "react";

function Input(props) {
  return (
    <div className='form-group'>
      <label htmlFor='name'>{props.label}</label>
      <input {...props.inputObj} onChange={props.onChange} />
    </div>
  );
}

export default Input;
