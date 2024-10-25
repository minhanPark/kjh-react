import React from "react";
import MyReact from "../lib/MyReact";
import { Form, ErrorMessage, Field } from "../lib/MyForm";

const useRegisterForm = () => {
  const [state, setState] = React.useState({
    value: { nickname: "", passwo: "" },
    error: { nickname: "", passwo: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      value: {
        ...state.value,
        [name]: value,
      },
    });
  };

  const handleReset = () => {
    setState({
      value: { nickname: "", passwo: "" },
      error: { nickname: "", passwo: "" },
    });
  };
  const handleSubmit = (e) => {
    setState({
      ...state,
      error: {
        nickname: /^\w+$/.test(state.value.nickname)
          ? ""
          : "영문, 숫자만 입력하세요.",
        password: /^.{3,6}$/.test(state.value.password)
          ? ""
          : "3~6 자리로 입력하세요.",
      },
    });
  };

  return {
    state,
    handleChange,
    handleReset,
    handleSubmit,
  };
};

const RegisterForm = () => {
  const { state, handleChange, handleReset, handleSubmit } = useRegisterForm();
  return (
    <>
      <div className="">
        <label htmlFor="">닉네임</label>
        <input
          type="text"
          name="nickname"
          value={state.value.nickname}
          onChange={handleChange}
        />
        <span>{state.error.nickname}</span>
      </div>
      <div className="">
        <label htmlFor="">비밀번호</label>
        <input
          type="password"
          name="password"
          value={state.value.password}
          onChange={handleChange}
        />
        <span>{state.error.password}</span>
      </div>
      <button onClick={handleReset}>초기화</button>
      <button onClick={handleSubmit}>회원 가입</button>
    </>
  );
};

export default RegisterForm;
