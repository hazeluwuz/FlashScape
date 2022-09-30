import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../store/session";
import "./LoginForm.css";
const LoginForm = ({ closeModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const demoLogin = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    setShowErrors(true);
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

  useEffect(() => {
    if (!email || !password) setIsDisabled(true);
    else setIsDisabled(false);
  }, [email, password]);
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
          onInput={() => setShowErrors(true)}
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
          onInput={() => setShowErrors(true)}
          placeholder=" "
          value={password}
          required
          onChange={updatePassword}
        />
        <label>Password</label>
      </div>
      <button
        className="login-modal-button round-button"
        type="submit"
        disabled={isDisabled}
      >
        Log in
      </button>
      <button className="login-modal-button round-button" onClick={demoLogin}>
        Demo User
      </button>
      <div className="display-errors">
        {errors.length > 0 &&
          showErrors &&
          Object.values(errors)[0].split(": ")[1]}
      </div>
    </form>
  );
};

export default LoginForm;
