import React from "react";
import Page from "../../Page";
import Title from "../../Title";
import ProductItem from "../../ProductItem";
import OrderForm from "./OrderForm";
import PaymentButton from "./PaymentButton";
import ProductApi from "shared/api/ProductApi";
import * as MyRouter from "../../../lib/MyRouter";
import * as MyLayout from "../../../lib/MyLayout";
import ErrorDialog from "../../ErrorDialog";
import OrderApi from "shared/api/OrderApi";
import PaymentSuccessDialog from "./PaymentSuccessDialog";

const CartPage = () => {
  const [product, setProduct] = React.useState();

  const handleSubmit = async (values) => {
    //const { startLoading, finishLoading, openDialog } = this.props;
    //startLoading("결제 중...");
    try {
      await OrderApi.createOrder(values);
    } catch (e) {
      console.error(e);
      //openDialog(<ErrorDialog />);
      return;
    }
    //finishLoading();
    //openDialog(<PaymentSuccessDialog />);
    //this.props.navigate("/order");
  };

  const fetch = async (productId) => {
    if (!productId) return;

    try {
      const product = await ProductApi.fetchProduct(productId);
      setProduct(product);
    } catch (e) {
      console.error(e);

      return;
    }
  };

  React.useEffect(() => {
    fetch("CACDA422");
  }, []);

  return (
    <div className="CartPage">
      <Page
        header={<Title backUrl="/">장바구니</Title>}
        footer={<PaymentButton />}
      >
        {product && <ProductItem product={product} />}
        <OrderForm onSubmit={handleSubmit} />
      </Page>
    </div>
  );
};

export default CartPage;
