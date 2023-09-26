import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkMultiple, Permission, PERMISSIONS, request } from 'react-native-permissions';
import { PlaceResponse } from '@api/card';
import dayjs from 'dayjs';

interface AppState {
  shakePick: boolean;
  isFirstLaunched: boolean;
  notificationLog: Array<{ date: string; values: string[] }>;
}

const initialState: AppState = {
  shakePick: false,
  isFirstLaunched: true,
  notificationLog: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShakePick: (state) => {
      if (!state.shakePick) {
        const permissions: Permission[] = [
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        ];
        checkMultiple(permissions).then((response) => {
          console.log(response);
          if (
            response['android.permission.POST_NOTIFICATIONS'] !== 'granted' ||
            response['android.permission.ACCESS_FINE_LOCATION'] !== 'granted' ||
            response['android.permission.ACCESS_BACKGROUND_LOCATION'] !== 'granted'
          ) {
            request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(() => {
              request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(() => {
                request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
              });
            });
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
    addNotificationLog: (state, action) => {
      const newNotificationLog = state.notificationLog;
      const today = dayjs().format('YYYY-MM-DD');
      if (newNotificationLog[0].date === today) {
        newNotificationLog[0].values.unshift(action.payload);
      } else {
        newNotificationLog.unshift({ date: today, values: [action.payload] });
      }
      state.notificationLog = newNotificationLog;
    },
  },
});

export const { setShakePick, unsetShakePick, setLaunch, reset, addNotificationLog } =
  appSlice.actions;

export default appSlice.reducer;
