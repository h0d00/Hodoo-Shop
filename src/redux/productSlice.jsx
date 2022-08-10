import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadProducts = createAsyncThunk("load/products", async () => {
  const res = await axios.get("https://fakestoreapi.com/products");
  return res.data;
});

let cartlist = JSON.parse(localStorage.getItem("cart"));

function cartCount(Array) {
  if (Array !== null)
    return Array.map((e) => e.count).reduce((prev, curr) => prev + curr, 0);
  else return 0;
}

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    cart: cartlist,
    cartCount: cartCount(cartlist),
    theme:
      localStorage.theme === undefined
        ? "dark"
        : localStorage.getItem("theme").replace(/\"/gi, ""),
  },
  reducers: {
    cartIn: (state, action) => {
      state.cart.push(action.payload);
    },
    updateCount: (state, action) => {
      state.cartCount = cartCount(action.payload);
    },

    themeToggle: (state, action) => {
      action.payload ? (state.theme = "dark") : (state.theme = "light");
      localStorage.setItem("theme", JSON.stringify(state.theme));
    },
  },

  extraReducers: {
    [loadProducts.pending]: (state, action) => {},
    [loadProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
    },
    [loadProducts.rejected]: (state, action) => {
      console.log("error");
    },
  },
});

export const { cartIn, updateCount, themeToggle } = productsSlice.actions;
export default productsSlice;
