import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

// 1. Helper Function: Load from LocalStorage
const loadCartFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }

    // Parse karein
    const parsedState = JSON.parse(serializedState);

    // FIX: Check karein ke kya 'items' array mojood hai?
    // Agar nahi hai, to default structure use karein
    if (!parsedState || !Array.isArray(parsedState.items)) {
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }

    return parsedState;
  } catch (err) {
    return { items: [], totalQuantity: 0, totalAmount: 0 };
  }
};

// 2. Helper Function: Save to LocalStorage & Recalculate Totals
const updateStorageAndTotals = (state) => {
  // Calculate Totals
  const { totalQuantity, totalAmount } = state.items.reduce(
    (acc, item) => {
      acc.totalQuantity += item.quantity;
      acc.totalAmount += item.price * item.quantity;
      return acc;
    },
    { totalQuantity: 0, totalAmount: 0 }
  );

  state.totalQuantity = totalQuantity;
  state.totalAmount = parseFloat(totalAmount.toFixed(2)); // Fix decimal issues

  // Save to LocalStorage
  localStorage.setItem("cart", JSON.stringify(state));
};

const initialState = {
  ...loadCartFromStorage(),
  isCartOpen: false, // <--- NEW STATE
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // --- NEW REDUCERS FOR DRAWER ---
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const quantityToAdd = newItem.quantityToAdd || 1;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        toast.success(`Increased quantity of ${newItem.title}`);
      } else {
        // Add new item with quantity 1
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.thumbnail, // Standardize image key
          quantity: quantityToAdd,
          stock: newItem.stock || 100, // Fallback if API doesn't send stock
        });
        toast.success(`${newItem.title} added to cart`);
      }

      updateStorageAndTotals(state);
      state.isCartOpen = true;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      toast.error("Item removed from cart");
      updateStorageAndTotals(state);
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity++;
        updateStorageAndTotals(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (item.quantity === 1) {
          // If quantity is 1, remove it (optional: or just stop at 1)
          state.items = state.items.filter((i) => i.id !== id);
          toast.error("Item removed from cart");
        } else {
          item.quantity--;
        }
        updateStorageAndTotals(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      toast.success("Cart cleared");
      localStorage.removeItem("cart");
    },
  },
});

export const {
  toggleCart,
  openCart,
  closeCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
