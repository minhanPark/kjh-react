import React from "react";
import CartPage from "../components/pages/CartPage";
import OrderPage from "../components/pages/OrderPage";
import ProductPage from "../components/pages/ProductPage";

export const routerContext = React.createContext({});
routerContext.displayName = "RouterContext";

export const Link = ({ to, ...rest }) => (
  <routerContext.Consumer>
    {({ path, changePath }) => {
      const handleClick = (e) => {
        e.preventDefault();
        if (to !== path) changePath(to);
      };
      return <a href={to} onClick={handleClick} {...rest} />;
    }}
  </routerContext.Consumer>
);

export class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: window.location.pathname,
    };
    this.handleChangePath = this.handleChangePath.bind(this);
  }

  handleChangePath(path) {
    this.setState({ path });
  }

  render() {
    const contextValue = {
      path: this.state.path,
      changePath: this.handleChangePath,
    };
    return (
      <routerContext.Provider value={contextValue}>
        {this.props.children}
      </routerContext.Provider>
    );
  }
}

export const Routes = ({ children }) => (
  <routerContext.Consumer>
    {({ path }) => {
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
      console.log(selectedElement);
      return selectedElement;
    }}
  </routerContext.Consumer>
);

export const Route = () => null;
