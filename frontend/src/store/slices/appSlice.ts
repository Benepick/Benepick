import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkNotifications, requestNotifications } from 'react-native-permissions';

const initialState = {
  shakePick: false,
  isFirstLaunched: true,
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
      state.shakePick = true;
    },
    unsetShakePick: (state) => {
      state.shakePick = false;
    },
    setLaunch: (state) => {
      state.isFirstLaunched = false;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { setShakePick, unsetShakePick, setLaunch, reset } = appSlice.actions;

export default appSlice.reducer;
