import React from "react";
import ProductApi from "shared/api/ProductApi";
import Navbar from "../../Navbar";
import Page from "../../Page";
import ProductItem from "../../ProductItem";
import Title from "../../Title";
import OrderableProductItem from "./OrderableProductItem";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
    };
  }
  async fetch() {
    try {
      const productList = await ProductApi.fetchProductList();
      this.setState({ productList });
    } catch (e) {
      console.error(e);
    }
  }
  componentDidMount() {
    this.fetch();
  }

  render() {
    return (
      <div className="ProductPage">
        <Page header={<Title>메뉴</Title>} footer={<Navbar />}>
          <ul>
            {this.state.productList.map((product) => (
              <li key={product.id}>
                <OrderableProductItem product={product} />
              </li>
            ))}
          </ul>
        </Page>
      </div>
    );
  }
}

export default ProductPage;
