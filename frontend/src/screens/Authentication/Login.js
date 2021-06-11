import React, { useState } from "react";
import "./Signup.css";

import { Link, useHistory } from "react-router-dom";
import Input from "../../components/Input";
import { loginUser } from "../../apiActions/actions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await loginUser({ email, password });

    if (!response?.status) {
      setLoading(false);
      setSuccess("");
      return setError(response?.message);
    }

    setError("");
    setSuccess("LoggedIn  Successfully");
    setLoading(false);
    history.push("/");
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

        <Link to='/forgotPassword'>ForgotPassword?</Link>

        <button type='submit' className='btn btn-primary'>
          {loading ? "Loading..." : "Login"}
        </button>

        <span className='register-screen__subtext'>
          DOnt have an account? <Link to='/signup'>Signup</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
