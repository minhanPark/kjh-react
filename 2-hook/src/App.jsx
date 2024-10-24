import React from "react";
import MyReact from "../lib/MyReact";

const LoginForm = () => {
  const [values, setValues] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({ email: "", password: "" });
  const [touched, setTouched] = React.useState({
    email: false,
    password: false,
  });

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

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextTouched = {
      email: true,
      password: true,
    };

    setTouched(nextTouched);

    const errors = validate(values);
    setErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    console.log("Submitted", values);
  };

  const handleBlur = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });
  };

  React.useEffect(() => {
    setErrors(validate(values));
  }, [values]);
  return (
    <form onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="email"
        value={values.email}
        placeholder="email"
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />
      {touched.email && errors.email && <span>{errors.email}</span>}
      <input
        type="password"
        name="password"
        value={values.password}
        placeholder="password"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.password && errors.password && <span>{errors.password}</span>}
      <button>로그인</button>
    </form>
  );
};

export default LoginForm;
