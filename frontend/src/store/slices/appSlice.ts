import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkNotifications, requestNotifications } from 'react-native-permissions';

const initialState = {
  shakePick: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShakePick: (state) => {
      if (!state.shakePick) {
        checkNotifications().then((response) => {
          if (response.status !== 'granted') {
            requestNotifications([]);
          }
        });
      }
      state.shakePick = !state.shakePick;
    },
  },
});

export const { setShakePick } = appSlice.actions;

export default appSlice.reducer;
