import Button from "./Button";

function ProductItem({ product, onClick }) {
  const { name, price, thumbnail } = product;
  return (
    <div className="ProductItem">
      <div className="description">
        <h2>{name}</h2>
        <div className="">{price.toLocaleString()}원</div>
        {onClick && (
          <Button styleType="brand" onClick={onClick}>
            장바구니 담기
          </Button>
        )}
      </div>
      <div className="thumbnail">
        <img src={thumbnail} alt={`${name} ${price.toLocaleString()}`} />
      </div>
    </div>
  );
}

export default ProductItem;
