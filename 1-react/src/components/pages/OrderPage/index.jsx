import Navbar from "../../Navbar";
import Page from "../../Page";
import Title from "../../Title";
import Card from "../../Card";

const OrderPage = () => (
  <div className="OrderPage">
    <Page header={<Title>주문내역</Title>} footer={<Navbar />}>
      <Card />
    </Page>
  </div>
);

export default OrderPage;
