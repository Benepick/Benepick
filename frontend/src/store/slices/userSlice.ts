import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
}

const initialState: UserState = {
  name: '',
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = user.actions;

export default user.reducer;
