import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, signUp } from "../../../store/session";
import "./SignupForm.css";
const validator = require("email-validator");
const SignUpForm = ({ closeModal }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (password === repeatPassword && !errors.length) {
      const data = await dispatch(signUp(firstName, lastName, email, password));
      if (data && data.errors) {
        console.log(data);
        setErrors(Object.values(data.errors));
      } else {
        closeModal();
      }
    }
  };
  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
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

  const handleShowErrors = () => {
    setShowErrors(true);
  };

  useEffect(() => {
    document.addEventListener("input", handleShowErrors);
    return () => document.removeEventListener("input", handleShowErrors);
  }, []);

  useEffect(() => {
    const errors = [];
    if (firstName.length < 5) {
      errors.push("firstName: First name must be at least 5 characters long");
    }
    if (firstName.length > 50) {
      errors.push("firstName: First name must be less than 50 characters long");
    }
    if (lastName.length < 5) {
      errors.push("lastName: Last name must be at least 5 characters long");
    }
    if (lastName.length > 50) {
      errors.push("lastName: Last name must be less than 50 characters long");
    }
    if (!validator.validate(email)) {
      errors.push("email: Invalid Email");
    }
    if (password.length < 6) {
      errors.push("password: Password must be at least 6 characters long");
    }
    if (password.length > 50) {
      errors.push("password: Password must be less than 50 characters long");
    }
    if (password !== repeatPassword) {
      errors.push("repeatPassword: Passwords must match");
    }
    setErrors(errors);
  }, [firstName, email, lastName, password, repeatPassword]);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className="signup-form">
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
          type="email"
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
      <button
        className="signup-modal-button round-button"
        type="submit"
        disabled={errors.length}
      >
        Sign Up
      </button>
      <button className="login-modal-button round-button" onClick={demoLogin}>
        Demo User
      </button>
      <div className="display-errors">
        {errors.length > 0 && showErrors && errors[0].split(": ")[1]}
      </div>
    </form>
  );
};

export default SignUpForm;
