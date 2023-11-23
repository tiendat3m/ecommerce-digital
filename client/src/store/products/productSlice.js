import { createSlice } from "@reduxjs/toolkit";
import { getNewProducts } from './asyncActions'
import { BsNutFill } from "react-icons/bs";

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    newProducts: null,
    errorMessage: '',
    dealDaily: BsNutFill
  },
  reducers: {
    getDealDaily: (state, action) => {
      state.dealDaily = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getNewProducts.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    builder.addCase(getNewProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newProducts = action.payload;
    });

    builder.addCase(getNewProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
})

export const { getDealDaily } = productSlice.actions
export default productSlice.reducer