import React from "react";
import MyReact from "../lib/MyReact";

const countContext = MyReact.createContext({});

const CountProvider = ({ children }) => {
  const [count, setCount] = React.useState(0);
  const value = { count, setCount };
  return (
    <countContext.Provider value={value}>{children}</countContext.Provider>
  );
};

const Count = () => {
  const { count } = MyReact.useContext(countContext);
  return <div>{count}</div>;
};

const PlusOne = () => {
  const { count, setCount } = MyReact.useContext(countContext);
  return <button onClick={() => setCount(count + 1)}>+1</button>;
};

export default () => (
  <CountProvider>
    <Count />
    <PlusOne />
  </CountProvider>
);
