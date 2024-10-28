import React from "react";
import MyReact from "../lib/MyReact";
import { Form, ErrorMessage, Field } from "../lib/MyForm";

const initialValues = {
  value: { nickname: "", password: "" },
  error: { nickname: "", password: "" },
};

const reducer = (state, action) => {
  if (action.type === "SET_FIELD") {
    return {
      ...state,
      value: {
        ...state.value,
        [action.name]: action.value,
      },
    };
  }
  if (action.type === "RESET") {
    return {
      value: { nickname: "", password: "" },
      error: { nickname: "", password: "" },
    };
  }
  if (action.type === "VALIDATE") {
    return {
      ...state,
      error: {
        nickname: /^\w+$/.test(state.value.nickname)
          ? ""
          : "영문, 숫자만 입력하세요.",
        password: /^.{3,6}$/.test(state.value.password)
          ? ""
          : "3~6 자리로 입력하세요.",
      },
    };
  }
  throw Error("알 수 없는 액션");
};

const RegisterForm = () => {
  const [state, dispatch] = MyReact.useReducer(reducer, initialValues);
  const handleChange = (e) => {
    dispatch({ type: "SET_FIELD", name: e.target.name, value: e.target.value });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const handleSubmit = () => {
    dispatch({ type: "VALIDATE" });
  };
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
