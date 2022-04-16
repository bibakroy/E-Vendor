import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state: any, action) => {
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
          `can't remove the product of id ${action.payload.id} as it's not existed`
        );
      }
      state.items = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectItems = (state: any) => state.cart.items;

export default cartSlice.reducer;
