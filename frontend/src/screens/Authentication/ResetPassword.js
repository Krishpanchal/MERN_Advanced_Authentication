import React, { useState } from "react";
import "./Signup.css";

import { Link, useParams } from "react-router-dom";
import Input from "../../components/Input";
import { resetPassword } from "../../apiActions/actions";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams();

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value !== confirmPassword) {
      return setIsPasswordMatch(false);
    }

    setIsPasswordMatch(true);
  };

  const confirmPasswordInputHandler = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      return setIsPasswordMatch(false);
    }
    setIsPasswordMatch(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isPasswordMatch) {
      return;
    }

    setLoading(true);
    const response = await resetPassword(token, password);

    if (!response?.status) {
      setLoading(false);
      setSuccess("");
      return setError(response?.message);
    }

    setError("");

    const passwordChangedText = (
      <p>
        Password Changed Successfully <Link to='/login'>Login</Link>
      </p>
    );

    setSuccess(passwordChangedText);
    setLoading(false);
  };

  return (
    <div className='register-screen'>
      <form onSubmit={submitHandler} className='register-screen__form'>
        <h3 className='register-title'>Reset Password</h3>

        {error && <span className='error-message'>{error}</span>}
        {success && <span className='success-message'>{success}</span>}

        <Input
          inputObj={{
            type: "password",
            id: "password",
            required: true,
            placeholder: "Enter Password",
            value: password,
          }}
          label='Password'
          onChange={passwordInputHandler}
        />

        <Input
          inputObj={{
            type: "password",
            id: "ConirmPassword",
            required: true,
            placeholder: "Enter Password",
            value: confirmPassword,
          }}
          label='Confirm Password'
          onChange={confirmPasswordInputHandler}
        />

        {!isPasswordMatch && <p>Password and Cofirm Password don't Match</p>}

        <button
          type='submit'
          disabled={success.length !== 0 ? true : false}
          className='btn btn-primary'>
          {loading ? "Loading..." : "Submit"}
        </button>

        <span className='register-screen__subtext'>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  );
}

export default ResetPassword;
