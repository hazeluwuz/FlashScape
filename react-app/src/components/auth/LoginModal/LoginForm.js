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

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    closeModal();
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
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
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
    </form>
  );
};

export default LoginForm;
