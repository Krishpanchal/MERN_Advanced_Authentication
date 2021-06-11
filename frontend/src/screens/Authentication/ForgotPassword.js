import React, { useState } from "react";
import "./Signup.css";

import { Link, useHistory } from "react-router-dom";
import Input from "../../components/Input";
import { forgotPassword } from "../../apiActions/actions";
// import {  } from "../../apiActions/actions";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await forgotPassword({ email });

    if (!response?.status) {
      setLoading(false);
      setSuccess("");
      return setError(response?.message);
    }

    setError("");
    setSuccess("A link has been sent to user email. Please Check");
    setLoading(false);
  };

  return (
    <div className='register-screen'>
      <form onSubmit={submitHandler} className='register-screen__form'>
        <h3 className='register-title'>Login</h3>

        {error && <span className='error-message'>{error}</span>}
        {success && <span className='success-message'>{success}</span>}

        <Input
          inputObj={{
            type: "email",
            id: "email",
            required: true,
            placeholder: "Enter Email",
            value: email,
          }}
          label='Email'
          onChange={emailInputHandler}
        />

        <Link to='/forgotPassword'>ForgotPassword?</Link>

        <button
          type='submit'
          disabled={success ? true : false}
          className='btn btn-primary'>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
