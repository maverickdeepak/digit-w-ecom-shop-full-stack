export const add_decimals = (value) => {
  return (Math.round(value * 100) / 100).toFixed(2);
};

export const update_cart = (state) => {
  // calculate items price
  state.item_price = add_decimals(
    state.cart_items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  // calculate shipping price (if order over $100 then free shipping else it will $10)
  state.shiping_price = add_decimals(state.item_price > 100 ? 0 : 10);
  // calaculate tax price (18% tax)
  state.tax_price = add_decimals(Number(0.18 * state.item_price).toFixed(2));
  // calculate total price
  state.total_price = (
    Number(state.item_price) +
    Number(state.shiping_price) +
    Number(state.tax_price)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
