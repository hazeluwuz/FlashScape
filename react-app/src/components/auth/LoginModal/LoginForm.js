import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import "./LoginForm.css";
const LoginForm = ({ closeModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const demoLogin = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      console.log(data);
      setErrors(data.errors);
    } else {
      closeModal();
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin} className="login-form">
      <div className="input-container">
        <input
          name="email"
          type="text"
          className="text-input"
          placeholder=" "
          value={email}
          required
          onChange={updateEmail}
        />
        <label>Email</label>
      </div>
      <div className="input-container">
        <input
          name="password"
          type="password"
          className="text-input"
          placeholder=" "
          value={password}
          required
          onChange={updatePassword}
        />
        <label>Password</label>
      </div>
      <button className="login-modal-button round-button" type="submit">
        Log in
      </button>
      <button className="login-modal-button round-button" onClick={demoLogin}>
        Demo User
      </button>
      <div className="display-errors">
        {errors.length > 0 && Object.values(errors)[0].split(": ")[1]}
      </div>
    </form>
  );
};

export default LoginForm;
