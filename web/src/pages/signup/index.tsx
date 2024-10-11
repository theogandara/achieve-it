import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");
  const [confirmPassword, _setConfirmPassword] = useState("");

  function setEmail(event: React.ChangeEvent<HTMLInputElement>) {
    _setEmail(event.target.value);
  }

  function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
    _setPassword(event.target.value);
  }

  function setConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
    _setConfirmPassword(event.target.value);
  }

  const navigate = useNavigate();

  function handleSignUp() {
    console.log(email, password, confirmPassword);
  }

  function handleClickLogin() {
    navigate("/login");
  }

  const disabled = !email || !password;

  return (
    <div className="container">
      <h2 className="text-large">
        Hello, let's get started with your account!
      </h2>

      <div className="input-container">
        <p className="text-small">Insert your email</p>
        <input placeholder="email" onChange={setEmail} />
      </div>

      <div className="input-container">
        <p className="text-small">Insert your password</p>
        <input placeholder="password" type="password" onChange={setPassword} />
      </div>

      <div className="input-container">
        <p className="text-small">Confirm your password</p>
        <input
          placeholder="confirm password"
          type="password"
          onChange={setConfirmPassword}
        />
      </div>

      <button disabled={disabled} onClick={handleSignUp}>
        SignUp
      </button>
      <button onClick={handleClickLogin} className="btn-tertiary">
        Login
      </button>
    </div>
  );
}
