import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setAutoLogIn: (state) => {
      state.autoLogIn = true;
    },
    clearToken: (state) => {
      state.token = '';
    },
    cancleAutoLogin: (state) => {
      state.autoLogIn = false;
    },
  },
});

export const { setToken, setAutoLogIn, clearToken, cancleAutoLogin } = userSlice.actions;

export default userSlice.reducer;
