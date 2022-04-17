import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../../utils/types";

type StateType = {
  items: ProductType[];
};

const initialState: StateType = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.items.findIndex(
        (cartItem: any) => cartItem.id === action.payload.id
      );
      let newCart = [...state.items];

      //findIndex
      //if the index is 0 or more than 0, it means the id is found in the items array
      //when the id is not existed in the items array, it return -1

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove the product of id ${action.payload.id} as it is not existed`
        );
      }
      state.items = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
