import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// Load from LocalStorage
const loadWishlist = () => {
  try {
    const serialized = localStorage.getItem("wishlist");
    return serialized ? JSON.parse(serialized) : [];
  } catch (e) {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        // Remove
        state.items.splice(index, 1);
        toast.success(`${product.title} removed from wishlist`);
      } else {
        // Add
        state.items.push(product);
        toast.success(`${product.title} added to wishlist`);
      }

      // Save
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
