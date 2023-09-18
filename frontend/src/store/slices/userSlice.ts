import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: '',
  autoLogIn: false,
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
  },
});

export const { setToken, clearToken, setAutoLogin } = userSlice.actions;

export default userSlice.reducer;
