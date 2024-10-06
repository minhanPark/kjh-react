import * as MyRouter from "../lib/MyRouter";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <MyRouter.Link to="/" className="active">
        메뉴목록
      </MyRouter.Link>
      <MyRouter.Link to="/order" className="">
        주문목록
      </MyRouter.Link>
    </nav>
  );
};

export default Navbar;
