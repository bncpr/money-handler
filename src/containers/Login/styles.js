import styled from "styled-components";

export const Error = styled.p`
  color: red;
  padding: 0;
  margin: 0;
`;
export const Login = styled.div`
  background-color: #fbfaf9;
  border-radius: 5px;
  box-shadow: 4px 4px 4px rgb(200, 200, 200);
  padding: 10px 25px;
  & form {
    display: flex;
    flex-direction: column;
  }
  & input {
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
  }
  & button {
    padding: 10px;
    margin-top: 8px;
    background-color: #eee;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  & p {
    font-size: 0.9em;
    cursor: pointer;
  }
`;
