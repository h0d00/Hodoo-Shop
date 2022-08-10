import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./layout/Main";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Fashion from "./components/Fashion";
import Accessory from "./components/Accessory";
import Digital from "./components/Digital";
import Cart from "./components/Cart";
import Product from "./layout/Product";
import ScrollToTop from "./components/ScrollToTop";
import { loadProducts } from "./redux/productSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart")) === null) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    if (JSON.parse(localStorage.getItem("theme")) === null) {
      localStorage.setItem("theme", JSON.stringify("dark"));
    }

    dispatch(loadProducts());
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path={"/"} element={<Main />}></Route>
          <Route path={"/fashion"} element={<Fashion />}></Route>
          <Route path={"/accessory"} element={<Accessory />}></Route>
          <Route path={"/digital"} element={<Digital />}></Route>
          <Route path={"/cart"} element={<Cart />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
