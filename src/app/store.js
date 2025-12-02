import { configureStore } from "@reduxjs/toolkit";
import { dummyProductsApi } from "../api/dummyProductsApi";
import { authApi } from "../features/auth/authApi";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    [dummyProductsApi.reducerPath]: dummyProductsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dummyProductsApi.middleware)
      .concat(authApi.middleware),
});
