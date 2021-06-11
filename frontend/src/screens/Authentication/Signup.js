import React, { useState } from "react";
import "./Signup.css";

import { Link, useHistory } from "react-router-dom";
import Input from "../../components/Input";
import { signupUser } from "../../apiActions/actions";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const nameInputHandler = (e) => {
    setName(e.target.value);
  };

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

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
    const response = await signupUser({ name, email, password });

    if (!response?.status) {
      setLoading(false);
      setSuccess("");
      return setError(response?.message);
    }

    setError("");
    setSuccess("Account Created Successfully");
    setLoading(false);
    history.push("/");
  };

  return (
    <div className='register-screen'>
      <form onSubmit={submitHandler} className='register-screen__form'>
        <h3 className='register-title'>Signup</h3>

        {error && <span className='error-message'>{error}</span>}
        {success && <span className='success-message'>{success}</span>}
        <Input
          inputObj={{
            type: "text",
            id: "name",
            required: true,
            placeholder: "Enter Username",
            value: name,
          }}
          label='Username'
          onChange={nameInputHandler}
        />

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

        <button type='submit' className='btn btn-primary'>
          {loading ? "Loading..." : "Register"}
        </button>

        <span className='register-screen__subtext'>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  );
}

export default Signup;
