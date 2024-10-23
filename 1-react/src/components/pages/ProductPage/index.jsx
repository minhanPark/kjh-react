import React from "react";
import Navbar from "../../Navbar";
import Page from "../../Page";
import Title from "../../Title";
import OrderableProductItem from "./OrderableProductItem";
import ProductApi from "shared/api/ProductApi";
import * as MyLayout from "../../../lib/MyLayout";
import ErrorDialog from "../../ErrorDialog";

const ProductPage = () => {
  const [productList, setProductList] = React.useState([]);
  const { startLoading, finishLoading, openDialog } = MyLayout.useDialog();

  const fetch = async () => {
    startLoading("메뉴 로딩중...");
    try {
      const productList = await ProductApi.fetchProductList();
      setProductList(productList);
    } catch (e) {
      console.error(e);
      finishLoading();
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
  };

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="ProductPage">
      <Page header={<Title>메뉴</Title>} footer={<Navbar />}>
        <ul>
          {productList.map((product) => (
            <li key={product.id}>
              <OrderableProductItem product={product} />
            </li>
          ))}
        </ul>
      </Page>
    </div>
  );
};

export default ProductPage;
