import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $inctanse } from './operations';

export const requestContatsThunk = createAsyncThunk(
  'contacts/getAll',
  async (_, thunkApi) => {
    try {
      const { data } = await $inctanse.get('/contacts');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  //поміняти contactData на newContact
  async (contactData, thunkApi) => {
    try {
      const { data } = await $inctanse.post('/contacts', contactData);
      console.log('data:', data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  //поміняти contactData на newContact
  async (contactId, thunkApi) => {
    try {
      const { data } = await $inctanse.delete(`/contacts/${contactId}`);
      console.log('data:', data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: null,
  isLoading: false,
  error: null,
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(requestContatsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestContatsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(requestContatsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //addContact---------------
      .addCase(addContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = [...state.contacts, action.payload];
        // state.contacts.push(action.payload)
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //deleteContact---------------
      .addCase(deleteContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(contact=> contact.id !== action.payload.id);
        // state.contacts.push(action.payload)
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const selectUserContacts = state => state.contacts.contacts;
export const selectContactsIsLoading = state => state.contacts.isLoading;
export const selectContactsError = state => state.contacts.error;

export const contactsReduser = contactsSlice.reducer;
