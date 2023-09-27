import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  autoLogIn: false,
  renewalTimeStamp: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = '';
    },
    setAutoLogin: (state, action) => {
      state.autoLogIn = action.payload;
    },
    setRenewalTimeStamp: (state, action) => {
      state.renewalTimeStamp = action.payload;
    },
  },
});

export const { setToken, clearToken, setAutoLogin, setRenewalTimeStamp } = userSlice.actions;

export default userSlice.reducer;
