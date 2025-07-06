import { configureStore } from "@reduxjs/toolkit";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = {
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
};

const initialState = {
  cart: {
    cartItems: (() => {
      try {
        return typeof window !== "undefined" &&
          localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [];
      } catch (e) {
        console.error("Error parsing cartItems from localStorage:", e);
        return [];
      }
    })(),
    shippingInfo: (() => {
      try {
        return typeof window !== "undefined" &&
          localStorage.getItem("shippingInfo")
          ? JSON.parse(localStorage.getItem("shippingInfo"))
          : {};
      } catch (e) {
        console.error("Error parsing shippingInfo from localStorage:", e);
        return {};
      }
    })(),
  },
};

const store = configureStore({
  reducer,
  preloadedState: initialState,
  // No need to specify middleware or DevTools; they're included by default
});

export default store;
