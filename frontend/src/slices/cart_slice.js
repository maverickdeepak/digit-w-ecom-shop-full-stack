import { createSlice } from "@reduxjs/toolkit";
import { update_cart } from "../utils/cart_utils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cart_items: [] };

const cart_slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_to_cart: (state, action) => {
      const item = action.payload;
      const exist_item = state.cart_items.find(
        (cart_item) => cart_item._id === item._id
      );
      console.log("exist_item", item)
      if (exist_item) {
        state.cart_items = state.cart_items.map((cart_item) =>
          cart_item._id === exist_item._id ? item : cart_item
        );
      } else {
        state.cart_items = [...state.cart_items, item];
      }

      return update_cart(state);
    },
  },
});

export const { add_to_cart } = cart_slice.actions;

export default cart_slice.reducer;
