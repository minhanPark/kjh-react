import React from "react";
import { getComponentName } from "./utils";

export const routerContext = React.createContext({});
routerContext.displayName = "RouterContext";

export const Router = ({ children }) => {
  const [path, setPath] = React.useState(window.location.pathname);

  const handleChangePath = (path) => {
    setPath(path);
    window.history.pushState({ path }, "", path);
  };

  const handleOnPopState = (event) => {
    const nextPath = event.state && event.state.path;
    if (!nextPath) return;
    setPath(nextPath);
  };

  React.useEffect(() => {
    window.addEventListener("popstate", handleOnPopState);
    window.history.replaceState({ path }, "");

    return () => window.removeEventListener("popstate", handleOnPopState);
  }, []);

  const contextValue = {
    path: path,
    changePath: handleChangePath,
  };
  return (
    <routerContext.Provider value={contextValue}>
      {children}
    </routerContext.Provider>
  );
};

export const Routes = ({ children }) => {
  const { path } = React.useContext(routerContext);

  let selectedElement = null;

  React.Children.forEach(children, (child) => {
    // 리액트 엘리먼트인지 검사한다.
    if (!React.isValidElement(child)) return;
    // Fragment는 렌더링하지 않는다.
    if (child.type === React.Fragment) return;
    // Route 컴포넌트 인지 검사
    if (!child.props.path || !child.props.element) return;
    // 요청 경로를 검사
    if (child.props.path !== path.replace(/\?.*$/, "")) return;
    selectedElement = child.props.element;
  });
  return selectedElement;
};

export const Route = () => null;

export const Link = ({ to, ...rest }) => {
  const { path, changePath } = React.useContext(routerContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (to !== path) changePath(to);
  };
  return <a href={to} onClick={handleClick} {...rest} />;
};

export const useNavigate = () => {
  const { path, changePath } = React.useContext(routerContext);
  const navigate = (nextPath) => {
    if (path !== nextPath) changePath(nextPath);
  };
  return navigate;
};

export const useMatch = () => {
  const { path } = React.useContext(routerContext);
  return (comparedPath) => path === comparedPath;
};

export const useParams = () => {
  // TODO: useMemo 사용해야함
  const params = () => {
    const params = new URLSearchParams(window.location.search);
    const paramsObject = {};
    for (const [key, value] of params) {
      paramsObject[key] = value;
    }
    return paramsObject;
  };
  return params();
};
