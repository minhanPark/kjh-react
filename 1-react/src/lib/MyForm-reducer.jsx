import React from "react";

const getInitialState = (values) => ({
  values,
  errors: {},
  touched: {},
});

const formReducer = (state, action) => {
  if (action.type === "SET_VALUES") {
    return {
      ...state,
      values: {
        ...state.values,
        [action.name]: action.value,
      },
    };
  }

  if (action.type === "SET_TOUCHED") {
    return {
      ...state,
      touched: {
        ...state.touched,
        [action.name]: true,
      },
    };
  }

  if (action.type === "SET_TOUCHED_ALL") {
    return {
      ...state,
      touched: Object.keys(state.values).reduce((touched, field) => {
        touched[field] = true;
        return touched;
      }, {}),
    };
  }

  if (action.type === "VALIDATION") {
    return {
      ...state,
      errors: action.validate(state.values),
    };
  }

  throw new Error(`Unknown action: ${action.type}`);
};

export const useForm = ({ initialValue, validate, onSubmit }) => {
  const [state, dispatch] = React.useReducer(
    formReducer,
    getInitialState(initialValue)
  );
  const handleChange = (event) => {
    dispatch({
      type: "SET_VALUES",
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: "SET_TOUCHED_ALL" });

    const nextState = formReducer(state, { type: "VALIDATION", validate });
    if (Object.values(nextState.errors).some(Boolean)) return;

    onSubmit(values);
  };

  const handleBlur = (event) => {
    dispatch({
      type: "SET_TOUCHED",
      name: event.target.name,
    });
  };

  const getFieldProps = (name) => {
    const value = state.values[name];
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
    dispatch({ type: "VALIDATION", validate });
  }, [state.values]);

  return {
    ...state,
    handleChange,
    handleSubmit,
    handleBlur,
    getFieldProps,
  };
};

const formContext = React.createContext({});
formContext.displayName = "FormContext";

export const Form = ({
  children,
  initialValue,
  validate,
  onSubmit,
  ...rest
}) => {
  const formValue = useForm({
    initialValue,
    validate,
    onSubmit,
  });

  return (
    <formContext.Provider value={formValue}>
      <form onSubmit={formValue.handleSubmit} noValidate {...rest}>
        {children}
      </form>
    </formContext.Provider>
  );
};

export const ErrorMessage = ({ name }) => {
  const { touched, errors } = React.useContext(formContext);
  if (!touched[name] || !errors[name]) return null;
  return <span className="error">{errors[name]}</span>;
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
