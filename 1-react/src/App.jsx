import React from "react";
import ProductPage from "./components/pages/ProductPage";
import OrderPage from "./components/pages/OrderPage";
// import createEventEmitter from "shared/lib/EventEmitter";
import CartPage from "./components/pages/CartPage";
import * as MyRouter from "./lib/MyRouter";
import * as MyLayout from "./lib/MyLayout";

const App = () => (
  <MyLayout.Layout>
    <MyRouter.Router>
      <MyRouter.Routes>
        <MyRouter.Route path="/order" element={<OrderPage />} />
        <MyRouter.Route path="/cart" element={<CartPage />} />
        <MyRouter.Route path="/" element={<ProductPage />} />
      </MyRouter.Routes>
    </MyRouter.Router>
  </MyLayout.Layout>
);

export default App;
