import { createSlice } from "@reduxjs/toolkit";
import { update_cart } from "../utils/cart_utils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cart_items: [], shipping_address: {}, payment_method: "PayPal" };

const cart_slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_to_cart: (state, action) => {
      const item = action.payload;
      const exist_item = state.cart_items.find(
        (cart_item) => cart_item._id === item._id
      );
      if (exist_item) {
        state.cart_items = state.cart_items.map((cart_item) =>
          cart_item._id === exist_item._id ? item : cart_item
        );
      } else {
        state.cart_items = [...state.cart_items, item];
      }

      return update_cart(state);
    },
    remove_item_from_cart: (state, action) => {
      state.cart_items = state.cart_items.filter(
        (item) => item._id !== action.payload
      );
      return update_cart(state);
    },
    save_shipping_address: (state, action) => {
      state.shipping_address = action.payload;
      return update_cart(state);
    },
    save_payment_method: (state, action) => {
      state.payment_method = action.payload
      return update_cart(state)
    }
  },
});

export const { add_to_cart, remove_item_from_cart, save_shipping_address, save_payment_method } =
  cart_slice.actions;

export default cart_slice.reducer;
