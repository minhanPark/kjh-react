import React from "react";
import Navbar from "../../Navbar";
import Page from "../../Page";
import Title from "../../Title";
import OrderDeliveryCard from "./OrderDeliveryCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderStatusCard from "./OrderStatusCard";
import OrderApi from "shared/api/OrderApi";
import * as MyLayout from "../../../lib/MyLayout";
import ErrorDialog from "../../ErrorDialog";

const fakeOrder = {
  id: "CACDA420",
  orderDate: "2024. 9. 30. 오전 9:23:53",
  status: "배달중",
  name: "짜장면",
  totalPrice: 7000,
  paymentMethod: "마이페이",
  productPrice: 6000,
  deliveryPrice: 3000,
  discountPrice: 2000,
  deliveryAddress: "서울특별시 송파구 잠실동 1번지",
  deliveryContact: "010-1111-2222",
  messageToShop: "포크는 주지 마세요",
  messageToRider: "안전하게 오세요",
  position: [60, 60],
};

const OrderPage = () => {
  const [order, setOrder] = React.useState();
  const { startLoading, finishLoading, openDialog } = MyLayout.useDialog();
  const fetch = async () => {
    startLoading("주문 정보 로딩중...");
    try {
      const order = await OrderApi.fetchMyOrder();
      setOrder(order);
    } catch (e) {
      console.error(e);
      finishLoading();
      openDialog(<ErrorDialog />);
    }
    finishLoading();
  };

  React.useEffect(() => {
    fetch();
  }, []);

  React.useEffect(() => {
    const timer = setInterval(async () => {
      const order = await OrderApi.fetchMyOrder();
      setOrder(order);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="OrderPage">
      <Page header={<Title>주문내역</Title>} footer={<Navbar />}>
        {order && (
          <>
            <OrderStatusCard order={order} />
            <OrderPaymentCard order={order} />
            <OrderDeliveryCard order={order} />
          </>
        )}
      </Page>
    </div>
  );
};

export default OrderPage;
