import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../../store/session";
import "./SignupForm.css";
const SignUpForm = ({ closeModal }) => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data) {
        setErrors(data);
      }
      closeModal();
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className="signup-form">
      <div className="input-container">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          name="firstName"
          placeholder=" "
          required
          className="text-input"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        ></input>
        <label>First Name</label>
      </div>
      <div className="input-container">
        <input
          type="text"
          className="text-input"
          name="lastName"
          placeholder=" "
          required
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        ></input>
        <label>Last Name</label>
      </div>
      <div className="input-container">
        <input
          type="text"
          name="email"
          className="text-input"
          placeholder=" "
          required
          onChange={updateEmail}
          value={email}
        ></input>
        <label>Email</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          name="password"
          placeholder=" "
          required
          className="text-input"
          onChange={updatePassword}
          value={password}
        ></input>{" "}
        <label>Password</label>
      </div>
      <div className="input-container">
        <input
          type="password"
          name="repeat_password"
          className="text-input"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          placeholder=" "
          required={true}
        ></input>{" "}
        <label>Repeat Password</label>
      </div>
      <button className="signup-modal-button round-button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
