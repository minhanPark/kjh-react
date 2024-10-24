import React from "react";

export const useForm = ({ initialValue, validate, onSubmit }) => {
  const [values, setValues] = React.useState(initialValue);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const handleChange = (event) => {
    const nextValues = {
      ...values,
      [event.target.name]: event.target.value,
    };

    setValues(nextValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextTouched = Object.keys(values).reduce((touched, filed) => {
      touched[filed] = true;
      return touched;
    }, {});

    setTouched(nextTouched);

    const errors = validate(values);
    setErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    onSubmit(values);
  };

  const handleBlur = (event) => {
    const nextTouched = {
      ...touched,
      [event.target.name]: true,
    };
    setTouched(nextTouched);
  };

  const getFieldProps = (name) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;
    return {
      name,
      value,
      onBlur,
      onChange,
    };
  };

  React.useEffect(() => {
    setErrors(validate(values));
  }, [values]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    getFieldProps,
  };
};

const formContext = React.createContext({});
formContext.displayName = "FormContext";

export const Form = ({ children, ...rest }) => {
  const formValue = useForm(rest);

  return (
    <formContext.Provider value={formValue}>
      <form onSubmit={formValue.handleSubmit} noValidate>
        {children}
      </form>
    </formContext.Provider>
  );
};

export const ErrorMessage = ({ name }) => {
  const { touched, errors } = React.useContext(formContext);
  if (!touched[name] || !errors[name]) return null;
  return <span>{errors[name]}</span>;
};

export const Field = ({ as = "input", children, ...rest }) => {
  const { getFieldProps } = React.useContext(formContext);
  return React.createElement(
    as,
    {
      ...rest,
      ...getFieldProps(rest.name),
    },
    children
  );
};
