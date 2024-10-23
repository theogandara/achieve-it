import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

export default function Login() {
  const [email, _setEmail] = useState("");
  const [password, _setPassword] = useState("");
  const [message, setMessage] = useState("");

  function setEmail(event: React.ChangeEvent<HTMLInputElement>) {
    _setEmail(event.target.value);
  }

  function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
    _setPassword(event.target.value);
  }
  const navigate = useNavigate();

  async function handleLogin() {
    if (email.length === 0) {
      setMessage("Email is required");
      return;
    }

    if (password.length === 0) {
      setMessage("Password is required");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    if (password.length > 20) {
      setMessage("Password must be at most 20 characters");
      return;
    }

    if (email.length < 6) {
      setMessage("Email must be at least 6 characters");
      return;
    }

    if (email.length > 50) {
      setMessage("Email must be at most 50 characters");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Invalid email");
      return;
    }

    if (!email.includes(".")) {
      setMessage("Invalid email");
      return;
    }

    try {
      const res = await api.post("/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
      return setMessage("Logged in successfully");
    } catch {
      setMessage("Invalid credentials");
    }
  }

  function handleClickSignUp() {
    navigate("/signup");
  }

  const disabled = !email || !password;

  return (
    <div className="container">
      <h2 className="text-large">Hello, let's get started!</h2>

      <div className="input-container">
        <p className="text-small">{message}</p>

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
