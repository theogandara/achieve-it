import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./signup.style";

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
    <S.Container>
      <h2 className="text-large">
        Hello, let's get started with your account!
      </h2>

      <S.InputContainer>
        <p className="text-small">Insert your email</p>
        <input placeholder="email" onChange={setEmail} />
      </S.InputContainer>

      <S.InputContainer>
        <p className="text-small">Insert your password</p>
        <input placeholder="password" type="password" onChange={setPassword} />
      </S.InputContainer>

      <S.InputContainer>
        <p className="text-small">Confirm your password</p>
        <input
          placeholder="confirm password"
          type="password"
          onChange={setConfirmPassword}
        />
      </S.InputContainer>

      <button disabled={disabled} onClick={handleSignUp}>
        SignUp
      </button>
      <button onClick={handleClickLogin} className="btn-tertiary">
        Login
      </button>
    </S.Container>
  );
}
