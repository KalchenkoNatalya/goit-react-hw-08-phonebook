import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const $inctanse = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  headers: { Authorization: 'Bearer token' },
});

export const setToken = token => {
  $inctanse.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  $inctanse.defaults.headers['Authorization'] = '';
};

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      const { data } = await $inctanse.post('/users/signup', userData);
      setToken(data.token);
      return data;
    } catch (error) {
      alert(
        'An error occurred, perhaps such an account is already registered, try another account name or address'
      );
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const { data } = await $inctanse.post('/users/login', userData);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    // console.log(token);
    try {
      setToken(token);
      const { data } = await $inctanse.get('/users/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const { data } = await $inctanse.post('/users/logout');
      console.log(data);
      clearToken();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
