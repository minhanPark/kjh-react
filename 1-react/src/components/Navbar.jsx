import * as MyRouter from "../lib/MyRouter";

const Navbar = ({ match }) => {
  return (
    <nav className="Navbar">
      <MyRouter.Link to="/" className={match("/") ? "active" : ""}>
        메뉴목록
      </MyRouter.Link>
      <MyRouter.Link to="/order" className={match("/order") ? "active" : ""}>
        주문목록
      </MyRouter.Link>
    </nav>
  );
};

export default MyRouter.withRouter(Navbar);
