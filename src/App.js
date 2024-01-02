import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart/Cart";
import Default from "./Components/Default";
import Modal from "./Components/Modal";
import { ProductProvider } from "./Context";
import CartTotals from "./Components/Cart/CartTotals";
function App() {
  return (
    <ProductProvider>
      <React.Fragment>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ProductList />} />
          <Route path="/details" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route element={<Default />} />
        </Routes>
        <Modal />
        {/* <CartTotals /> */}
      </React.Fragment>
    </ProductProvider>
  );
}

export default App;
