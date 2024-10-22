import FormControl from "../../FormControl";
import { useRef } from "react";

const OrderForm = ({ onSubmit }) => {
  const formRef = useRef(null);
  const getInputValuesByName = (name) => {
    if (!formRef.current) return;
    const inputElement = formRef.current.elements.namedItem(name);
    return inputElement ? inputElement.value : "";
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    //const form = formRef.current;
    //form.elements.namedItem("deliveryAddress").value
    const deliveryAddress = getInputValuesByName("deliveryAddress");
    const deliveryContact = getInputValuesByName("deliveryContact");
    const paymentMethod = getInputValuesByName("paymentMethod");
    const messageToShop = getInputValuesByName("messageToShop");
    const messageToRider = getInputValuesByName("messageToRider");

    onSubmit({
      deliveryAddress,
      deliveryContact,
      paymentMethod,
      messageToShop,
      messageToRider,
    });
  };
  return (
    <form
      className="OrderForm"
      id="order-form"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <FormControl label="주소" htmlFor="deliveryAddress" required>
        <input
          type="text"
          name="deliveryAddress"
          id="deliveryAddress"
          placeholder="배달받을 주소를 입력하세요."
          required
          autoFocus
        />
      </FormControl>
      <FormControl label="연락처" htmlFor="deliveryContact" required>
        <input
          type="text"
          name="deliveryContact"
          id="deliveryContact"
          placeholder="연락처를 입력하세요."
          required
          pattern="^\d{2,3}-\d{3,4}-\d{4}$"
        />
      </FormControl>
      <FormControl label="결제수단" htmlFor="paymentMethod" required>
        <select name="paymentMethod" id="paymentMethod">
          <option value="마이페이">마이페이</option>
          <option value="만나서 결제">만나서 결제</option>
        </select>
      </FormControl>
      <FormControl label="가게 사장님께" htmlFor="messageToShop">
        <textarea name="messageToShop" id="messageToShop" />
      </FormControl>
      <FormControl label="라이더님께" htmlFor="messageToRider">
        <textarea name="messageToRider" id="messageToRider" />
      </FormControl>
    </form>
  );
};

export default OrderForm;
