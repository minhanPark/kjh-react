import Button from "../../Button";
import Page from "../../Page";
import Title from "../../Title";
import ProductItem from "../../ProductItem";
import FormControl from "../../FormControl";
import OrderForm from "./OrderForm";

const fakeProduct = {
  id: "CACDA421",
  name: "해물 계란 라면",
  price: 6000,
  thumbnail: "./images/menu-해물계란라면.jpg",
};

const CartPage = () => {
  return (
    <div className="CartPage">
      <Page
        header={<Title backUrl="/">장바구니</Title>}
        footer={
          <Button styleType="brand-solid" block form="order-form">
            결제하기
          </Button>
        }
      >
        <ProductItem product={fakeProduct} />
        <OrderForm />
      </Page>
    </div>
  );
};

export default CartPage;
