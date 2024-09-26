import ProductItem from "./components/ProductItem";
import Title from "./components/Title";

const fakeProduct = {
  id: "CACDA421",
  name: "해물 계란 라면",
  price: 6000,
  thumbnail: "./images/menu-해물계란라면.jpg",
};

const App = () => (
  <div className="ProductPage">
    <div className="Page">
      <Title>메뉴</Title>
      <main>
        <ul>
          <ProductItem product={fakeProduct} />
        </ul>
      </main>
      <footer>
        <nav className="Navbar">
          <a href="#" className="active">
            메뉴목록
          </a>
          <a href="#" className="">
            주문목록
          </a>
        </nav>
      </footer>
    </div>
  </div>
);

export default App;
