import ProductItem from "../../ProductItem";
import * as MyRouter from "../../../lib/MyRouter";

const OrderableProductItem = ({ product }) => {
  const navigate = MyRouter.useNavigate();
  const handleClick = () => {
    navigate(`/cart?productId=${product.id}`);
  };
  return <ProductItem product={product} onClick={handleClick} />;
};

export default OrderableProductItem;
