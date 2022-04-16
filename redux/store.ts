import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import { ProductType } from "../utils/types";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectItems = (state: RootState) => state.cart.items;
export const selectTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total: number, item: ProductType) => total + item.price,
    0
  );

export default store;
