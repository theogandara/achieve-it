import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");

  function setEmail(event: React.ChangeEvent<HTMLInputElement>) {
    _setEmail(event.target.value);
  }

  function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
    _setPassword(event.target.value);
  }
  const navigate = useNavigate();

  function handleLogin() {
    console.log(email, password);
  }

  function handleClickSignUp() {
    navigate("/signup");
  }

  const disabled = !email || !password;

  return (
    <div className="container">
      <h2 className="text-large">Hello, let's get started!</h2>

      <div className="input-container">
        <p className="text-small">Insert your email</p>
        <input placeholder="email" onChange={setEmail} />
      </div>

      <div className="input-container">
        <p className="text-small">Insert your password</p>
        <input placeholder="password" type="password" onChange={setPassword} />
      </div>

      <button disabled={disabled} onClick={handleLogin}>
        Login
      </button>
      <button onClick={handleClickSignUp} className="btn-tertiary">
        SignUp
      </button>
    </div>
  );
}
