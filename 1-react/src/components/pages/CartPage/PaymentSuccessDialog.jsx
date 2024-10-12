import * as MyRouter from "../../../lib/MyRouter";
import * as MyLayout from "../../../lib/MyLayout";
import Button from "../../Button";
import Dialog from "../../Dialog";

const PaymentSuccessDialog = ({ navigate, closeDialog }) => {
  const handleClickYes = () => {
    closeDialog();
    navigate("/order");
  };
  const handleClickNo = () => {
    closeDialog();
    navigate("/");
  };
  return (
    <Dialog
      header={<>결제 완료</>}
      footer={
        <>
          <Button style={{ marginRight: "8px" }} onClick={handleClickNo}>
            아니요
          </Button>
          <Button styleType={"brand"} onClick={handleClickYes}>
            예, 주문상태를 확인하겠습니다.
          </Button>
        </>
      }
    >
      결제가 완료되었습니다. 주문 상태를 보러가시겠습니까?
    </Dialog>
  );
};

export default MyLayout.withLayout(MyRouter.withRouter(PaymentSuccessDialog));
