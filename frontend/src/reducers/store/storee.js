import { configureStore } from "@reduxjs/toolkit";

// import { cartReducer } from "../cartReducer";
// import cartslice
// import cartSlice
// import cartSlice
import cartSlice from "./slice/cartSlice";
import orderSlice from "./slice/orderSlice";
import productSlice from "./slice/productSlice";
import userSlice from "./slice/userSlice";

//
const loadCartFromStorage = () => {
  if (typeof window === "undefined") {
    return { cartItems: [], shippingInfo: {} };
  }
  try {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    const shippingInfo = localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {};
    return { cartItems, shippingInfo };
  } catch (e) {
    console.error("Error parsing localStorage data:", e);
    return { cartItems: [], shippingInfo: {} };
  }
};

const preloadedState = {
  cart: {
    ...loadCartFromStorage(),
    loading: false,
    error: null,
  },
};
const store = configureStore({
  reducer: {
    cart: cartSlice,
    order: orderSlice,
    product: productSlice,
    user: userSlice,
  },
  preloadedState,
});

export default store;
