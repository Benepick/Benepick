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
    clearToken: (state) => {
      state.token = '';
    },
    setAutoLogIn: (state) => {
      state.autoLogIn = !state.autoLogIn;
    },
  },
});

export const { setToken, clearToken, setAutoLogIn } = userSlice.actions;

export default userSlice.reducer;
