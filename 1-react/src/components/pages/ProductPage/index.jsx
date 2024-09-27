import Navbar from "../../Navbar";
import Page from "../../Page";
import ProductItem from "../../ProductItem";
import Title from "../../Title";

const fakeProduct = {
  id: "CACDA421",
  name: "해물 계란 라면",
  price: 6000,
  thumbnail: "./images/menu-해물계란라면.jpg",
};

const ProductPage = () => (
  <div className="ProductPage">
    <Page header={<Title>메뉴</Title>} footer={<Navbar />}>
      <ul>
        <ProductItem product={fakeProduct} />
      </ul>
    </Page>
  </div>
);

export default ProductPage;
