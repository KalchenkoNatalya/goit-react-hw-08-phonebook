import {
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from './operations';

import { createSlice } from '@reduxjs/toolkit';

const initialContactsState = {
  isLoading: false,
  error: null,
  userData: null,
  authentificated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialContactsState,

  extraReducers: builder =>
    builder
      .addCase(registerUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.authentificated = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contacts.items = action.payload;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //----------Login---------------
      .addCase(loginUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.authentificated = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contacts.items = action.payload;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //-------Refresh---------------
      .addCase(refreshUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.authentificated = false;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contacts.items = action.payload;
        state.authentificated = true;
        state.userData = action.payload;
      })
      .addCase(refreshUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //-----Logout------------
      .addCase(logoutUserThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.authentificated = false;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contacts.items = action.payload;
        state.authentificated = false;
        state.userData = null;
        state.token = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const selectUserLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
export const selectToken = state => state.auth.token;
export const selectUserData = state => state.auth.userData;
export const selecAuthentificated = state => state.auth.authentificated;

//генеруємо екшени
export const { fromfilter } = authSlice.actions;

// генеруємо "цех" - редьюсер
export const authReducer = authSlice.reducer;
