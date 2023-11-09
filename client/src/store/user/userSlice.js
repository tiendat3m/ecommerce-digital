import { createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
    mes: '',
    currentCart: []

  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.token = action.payload.token
    },
    logout: (state, action) => {
      state.isLoggedIn = false
      state.current = null
      state.token = null
      state.isLoading = false
    },
    clearMessage: (state, action) => {
      state.mes = ''
    },
    updateCart: (state, action) => {
      const { pid, color, quantity } = action.payload
      const updateItem = state.currentCart.find(el => el.color === color && el.product?._id === pid)
      if (updateItem) updateItem.quantity = quantity
      else state.mes = 'Please try again'
    }
  },

  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.isLoggedIn = true;
      state.currentCart = action.payload.cart
    });

    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
      state.token = null;
      state.isLoggedIn = false;
      state.mes = 'Login expired, please login again.'
    });
  },
})

export const { login, logout, clearMessage, updateCart } = userSlice.actions
export default userSlice.reducer