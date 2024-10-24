import React from "react";
import MyReact from "../lib/MyReact";
import { Form, ErrorMessage, Field } from "../lib/MyForm";

const LoginForm = () => {
  const validate = (values) => {
    const errors = {
      email: "",
      password: "",
    };

    if (!values.email) {
      errors.email = "이메일을 입력해주세요.";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력해주세요.";
    }

    return errors;
  };

  const handleSubmit = (values) => {
    console.log("Submitted", values);
  };

  return (
    <Form
      initialValue={{ email: "", password: "" }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      <Field name="email" placeholder="email" />
      <ErrorMessage name="email" />
      <Field name="password" placeholder="password" />
      <ErrorMessage name="password" />
      <button>로그인</button>
    </Form>
  );
};

export default LoginForm;
