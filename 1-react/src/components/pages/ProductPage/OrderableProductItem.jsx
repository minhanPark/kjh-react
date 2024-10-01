import ProductItem from "../../ProductItem";

const OrderableProductItem = ({ product }) => {
  const handleClick = () => {
    console.log("장바구니 담기");
  };
  return <ProductItem product={product} onClick={handleClick} />;
};

export default OrderableProductItem;
