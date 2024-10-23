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
  const { productId } = MyRouter.useParams();
  const navigate = MyRouter.useNavigate();
  const { startLoading, finishLoading, openDialog } = MyLayout.useDialog();

  const handleSubmit = async (values) => {
    startLoading("결제 중...");
    try {
      await OrderApi.createOrder(values);
    } catch (e) {
      console.error(e);
      finishLoading();
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
    openDialog(<PaymentSuccessDialog />);
    navigate("/order");
  };

  const fetch = async (productId) => {
    if (!productId) return;
    startLoading("장바구니에 담는중....");
    try {
      const product = await ProductApi.fetchProduct(productId);
      setProduct(product);
    } catch (e) {
      console.error(e);
      finishLoading();
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
  };

  React.useEffect(() => {
    if (productId) fetch(productId);
  }, [productId]);

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
