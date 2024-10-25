import FormControl from "../../FormControl";
import { useRef } from "react";
import * as MyForm from "../../../lib/MyForm";

const OrderForm = ({ onSubmit }) => {
  const validate = (values) => {
    const errors = {
      deliveryAddress: "",
      deliveryContact: "",
    };

    if (!values.deliveryAddress) {
      errors.deliveryAddress = "배달받을 주소를 입력해주세요.";
    }
    if (!values.deliveryContact) {
      errors.deliveryContact = "연락처를 입력해주세요.";
    }

    // if (!/^d{2,3}-\d{3,4}-\d{4}$/.test(values.deliveryContact)) {
    //   errors.deliveryContact = "연락처 형식이 올바르지 않습니다.";
    // }

    return errors;
  };
  return (
    <MyForm.Form
      initialValue={{
        deliveryAddress: "",
        deliveryContact: "",
        paymentMethod: "마이페이",
        messageToShop: "",
        messageToRider: "",
      }}
      onSubmit={onSubmit}
      validate={validate}
      className="OrderForm"
      id="order-form"
    >
      <FormControl label="주소" htmlFor="deliveryAddress" required>
        <MyForm.Field
          name="deliveryAddress"
          id="deliveryAddress"
          placeholder="배달받을 주소를 입력하세요."
          autoFocus
        />
        <MyForm.ErrorMessage name="deliveryAddress" />
      </FormControl>
      <FormControl label="연락처" htmlFor="deliveryContact" required>
        <MyForm.Field
          name="deliveryContact"
          id="deliveryContact"
          placeholder="연락처를 입력하세요."
          pattern="^\d{2,3}-\d{3,4}-\d{4}$"
        />
        <MyForm.ErrorMessage name="deliveryContact" />
      </FormControl>
      <FormControl label="결제수단" htmlFor="paymentMethod" required>
        <MyForm.Field as="select" name="paymentMethod" id="paymentMethod">
          <option value="마이페이">마이페이</option>
          <option value="만나서 결제">만나서 결제</option>
        </MyForm.Field>
        <MyForm.ErrorMessage name="paymentMethod" />
      </FormControl>
      <FormControl label="가게 사장님께" htmlFor="messageToShop">
        <MyForm.Field as="textarea" name="messageToShop" id="messageToShop" />
      </FormControl>
      <FormControl label="라이더님께" htmlFor="messageToRider">
        <MyForm.Field as="textarea" name="messageToRider" id="messageToRider" />
      </FormControl>
    </MyForm.Form>
    // <form
    //   className="OrderForm"
    //   id="order-form"
    //   onSubmit={handleSubmit}
    //   ref={formRef}
    // >
    //   <FormControl label="주소" htmlFor="deliveryAddress" required>
    //     <input
    //       type="text"
    //       name="deliveryAddress"
    //       id="deliveryAddress"
    //       placeholder="배달받을 주소를 입력하세요."
    //       required
    //       autoFocus
    //     />
    //   </FormControl>
    //   <FormControl label="연락처" htmlFor="deliveryContact" required>
    //     <input
    //       type="text"
    //       name="deliveryContact"
    //       id="deliveryContact"
    //       placeholder="연락처를 입력하세요."
    //       required
    //       pattern="^\d{2,3}-\d{3,4}-\d{4}$"
    //     />
    //   </FormControl>
    //   <FormControl label="결제수단" htmlFor="paymentMethod" required>
    //     <select name="paymentMethod" id="paymentMethod">
    //       <option value="마이페이">마이페이</option>
    //       <option value="만나서 결제">만나서 결제</option>
    //     </select>
    //   </FormControl>
    //   <FormControl label="가게 사장님께" htmlFor="messageToShop">
    //     <textarea name="messageToShop" id="messageToShop" />
    //   </FormControl>
    //   <FormControl label="라이더님께" htmlFor="messageToRider">
    //     <textarea name="messageToRider" id="messageToRider" />
    //   </FormControl>
    // </form>
  );
};

export default OrderForm;
