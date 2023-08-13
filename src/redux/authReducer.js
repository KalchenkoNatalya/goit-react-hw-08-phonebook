import {
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
  registerUserThunk,
} from './operations';

import { createSlice }  from '@reduxjs/toolkit';

const initialContactsState = {
  // items: [],
  isLoading: false,
  error: null,
  userData: null,
  authentificated: false,
  token: null,

  // filter: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialContactsState,
  // reducers: {
  //     fromfilter: (state, action) => {
  //     state.filter = action.payload;
  //   },
  // },
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
  //     .addCase(addContact.pending, state => {
  //       state.contacts.isLoading = true;
  //       state.contacts.error = null;
  //     })
  //     .addCase(addContact.fulfilled, (state, action) => {
  //       state.contacts.isLoading = false;
  //       state.contacts.items = [...state.contacts.items, action.payload];
  //     })
  //     .addCase(addContact.rejected, (state, action) => {
  //       state.contacts.isLoading = false;
  //       state.contacts.error = action.payload;
  //     })

  //     .addCase(deleteContact.pending, state => {
  //       state.contacts.isLoading = true;
  //       state.contacts.error = null;
  //     })
  //     .addCase(deleteContact.fulfilled, (state, action) => {
  //       state.contacts.isLoading = false;
  //       state.contacts.items = state.contacts.items.filter(
  //         contact => contact.id !== action.payload.id
  //       );
  //     })
  //     .addCase(deleteContact.rejected, (state, action) => {
  //       state.contacts.isLoading = false;
  //       state.contacts.error = action.payload;
  //     }),
});

export const selectUserLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
export const selectToken = state => state.auth.token;
export const selectUserData = state => state.auth.useData;
export const selecAuthentificated = state => state.auth.authentificated;

//генеруємо екшени
export const { fromfilter } = authSlice.actions;

// генеруємо "цех" - редьюсер
export const authReducer = authSlice.reducer;
