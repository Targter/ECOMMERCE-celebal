// src/features/product/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../api/axios";

// Initial state
const initialState = {
  products: [],
  productsCount: 0,
  resultPerPage: 0,
  filteredProductsCount: 0,
  product: null,
  reviews: [],
  loading: false,
  error: null,
  success: false,
  isUpdated: false,
  isDeleted: false,
};

// Async Thunks
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword = "", category, currentPage }, { rejectWithValue }) => {
    try {
      console.log("here to get the product");
      // let link = `/api/v1/products?keyword=${keyword}`;
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
      if (category) {
        console.log("this  called... caterogray", category);
        link += `&category=${category}`;
      }
      console.log("linkm:", link);
      const response = await axios.get(link, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("respojsne:", response);
      const data = response.data;
      console.log("data:", data);
      return {
        products: data.products,
        productsCount: data.productsCount,
        resultPerPage: data.resultPerPage,
        filteredProductsCount: data.filteredProductsCount,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const getAdminProduct = createAsyncThunk(
  "product/getAdminProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/admin/products", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch admin products"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      console.log("prodcutDAta", productData);
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        "/api/v1/admin/product/new",
        productData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `/api/v1/admin/product/${id}`,
        productData,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      console.log("id:", id);
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      console.log("productId In slice:", id);
      const { data } = await axios.get(`/api/v1/product/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("product found with  id: ", data);
      return data.product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  }
);

export const newReview = createAsyncThunk(
  "product/newReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put("/api/v1/review", reviewData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit review"
      );
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "product/getAllReviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/reviews?id=${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data.reviews;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

export const deleteReviews = createAsyncThunk(
  "product/deleteReviews",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/reviews?id=${reviewId}&productId=${productId}`,
        {headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

// Product Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
    resetNewProduct(state) {
      state.success = false;
    },
    resetUpdateProduct(state) {
      state.isUpdated = false;
    },
    resetDeleteProduct(state) {
      state.isDeleted = false;
    },
    resetNewReview(state) {
      state.success = false;
    },
    resetDeleteReview(state) {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    // Get Products
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.filteredProductsCount = action.payload.filteredProductsCount;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Admin Products
    builder
      .addCase(getAdminProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAdminProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get Product Details
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // New Review
    builder
      .addCase(newReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(newReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get All Reviews
    builder
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete Review
    builder
      .addCase(deleteReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload;
      })
      .addCase(deleteReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearErrors,
  resetNewProduct,
  resetUpdateProduct,
  resetDeleteProduct,
  resetNewReview,
  resetDeleteReview,
} = productSlice.actions;
export default productSlice.reducer;
