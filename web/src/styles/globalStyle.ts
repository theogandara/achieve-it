import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, #root {
    background-color: #1c1c1e;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  main {
    padding: 24px;
    margin-bottom: 78px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    color: #fff;
  }

  body {
    font-family: "Roboto", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #1c1c1e;
  }

  input {
    border-radius: 4px;
    padding: 12px;
    width: 100%;
    font-size: 18px;
    line-height: 20px;
    border: 1px solid #d1d1d6;
    background-color: #1c1c1e;
    color: #fff;
  }

  input::placeholder {
    color: #8e8e93;
  }

  input:focus {
    outline: 1px solid #0a84ff;
  }

  button {
    border-radius: 4px;
    padding: 12px;
    width: 100%;
    text-align: center;
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    background-color: #0a84ff;
    color: #fff;
  }

  button:disabled {
    background-color: #0a84ff80;
    cursor: not-allowed;
  }

  .btn-secondary {
    background-color: transparent;
  }

  .btn-tertiary {
    background-color: #fff;
    color: #1c1c1e;
  }

  .text-large {
    font-size: 24px;
    line-height: 28px;
    font-weight: 600;
  }

  .text-medium {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
  }

  .text-small {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #9a999e;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-left {
    text-align: left;
  }

`;
