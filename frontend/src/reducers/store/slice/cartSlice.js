// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  cartItems: [],
  shippingInfo: {},
  loading: false, // Added for async addItemsToCart
  error: null, // Added for async error handling
};

// Async Thunk for adding items to cart
export const addItemsToCart = createAsyncThunk(
  "cart/addItemsToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      // console.log("called add item to cart function", id);
      const { data } = await axios.get(`/api/v1/product/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart"
      );
    }
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItemsFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo));
    },
    clearCart(state) {
      state.cartItems = [];
      state.shippingInfo = {};
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingInfo");
    },
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemsToCart.fulfilled, (state, action) => {
        state.loading = false;
        const item = action.payload;
        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
        if (isItemExist) {
          state.cartItems = state.cartItems.map((i) =>
            i.product === item.product ? item : i
          );
        } else {
          state.cartItems = [...state.cartItems, item];
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addItemsToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeItemsFromCart, saveShippingInfo, clearCart, clearErrors } =
  cartSlice.actions;
export default cartSlice.reducer;
