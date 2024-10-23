import styled from "styled-components";

export const Screen = styled.div`
  padding: 24px;
  margin-bottom: 78px;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-bottom: 8px;

  button {
    padding: 12px;
    height: 55px;
    width: 55px;
    border-radius: 50%;
    background-color: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    color: black;
  }
`;

export const Title = styled.h1`
  margin-bottom: 16px;
`;

export const CardReport = styled.div`
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 24px;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  button {
    background-color: transparent;
    padding: 0;
  }
`;

export const CardReportHeader = styled.div`
  text-align: center;
`;

export const CardReportItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  input {
    width: 32px;
    height: 32px;
    border: 1px solid #0a84ff;
    border-radius: 4px;
    text-align: center;
    accent-color: #0a84ff;
  }
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
