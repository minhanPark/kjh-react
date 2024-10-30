import React from "react";
import Button from "../../Button";
import Card from "../../Card";
import * as MyLayout from "../../../lib/MyLayout";
import Dialog from "../../Dialog";

const OrderStatusCard = ({ order }) => {
  const { status, name, orderDate, id, position } = order;
  const { openDialog, closeDialog } = MyLayout.useDialog();

  const calculateDeliveryTime = () => {
    console.log("calculateDeliveryTime");
    const 오랜시간 = 99999;
    for (let i = 0; i < 오랜시간; i++) {}

    if (!position[0]) return "-";
    return `${position[0]}분`;
  };

  const expectedDeliveryTime = React.useMemo(calculateDeliveryTime, [
    position[0],
  ]);

  const handleClick = React.useCallback(() => {
    openDialog(
      <Dialog footer={<Button onClick={closeDialog}>확인</Button>}>
        <ul>
          <li>위도: {position[0]}</li>
          <li>경도: {position[1]}</li>
        </ul>
      </Dialog>
    );
  }, []);

  return (
    <Card
      header={
        <>
          <strong>{status}</strong>
          <br />
          {name}
        </>
      }
      data={[
        { term: "주문일시", description: orderDate },
        { term: "주문번호", description: id },
        {
          term: "도착 예상 시간",
          description: (
            <ExpectedDeliveryTime
              value={expectedDeliveryTime}
              onClick={handleClick}
            />
          ),
        },
      ]}
      footer={
        <>
          <Button>전화</Button>
          <Button>가게 보기</Button>
        </>
      }
    />
  );
};

export default OrderStatusCard;

const ExpectedDeliveryTime = React.memo(({ value, onClick }) => {
  console.log("ExpectedDeliveryTime");
  return (
    <>
      {value}
      <Button onClick={onClick}>위치보기</Button>
    </>
  );
});
