import createEventEmitter from "shared/lib/EventEmitter";

const MyReact = (function () {
  function createContext(initialValue) {
    const emitter = createEventEmitter(initialValue);

    const Provider = ({ value, children }) => <>{children}</>;

    const Consumer = ({ children }) => <>{children(emitter.get())}</>;

    return {
      Provider,
      Consumer,
    };
  }
  return {
    createContext,
  };
})();

export default MyReact;
