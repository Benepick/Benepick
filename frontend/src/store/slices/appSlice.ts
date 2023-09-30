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
      const today = dayjs().format('YYYY-MM-DD');
      if (state.notificationLog?.length !== undefined) {
        // 기존 로그가 있는 경우 또는 정의되지 않은 경우를 처리
        if (state.notificationLog.length !== 0 && state.notificationLog[0].date === today) {
          state.notificationLog[0].values.unshift(action.payload);
        } else {
          state.notificationLog.push({ date: today, values: [action.payload] });
        }
      } else {
        // state.notificationLog이 정의되지 않은 경우 처리
        state.notificationLog = [{ date: today, values: [action.payload] }];
      }
      console.log(state.notificationLog);
      // const newNotificationLog = state.notificationLog;
      // console.log(newNotificationLog);
      // const today = dayjs().format('YYYY-MM-DD');
      // if (newNotificationLog.length != 0) {
      //   if (newNotificationLog[0].date === today) {
      //     newNotificationLog[0].values.unshift(action.payload);
      //   } else {
      //     newNotificationLog.push({ date: today, values: [action.payload] });
      //   }
      // } else {
      //   newNotificationLog.push({ date: today, values: [action.payload] });
      // }
      // state.notificationLog = newNotificationLog;
    },
  },
});

export const { setShakePick, unsetShakePick, setLaunch, reset, addNotificationLog } =
  appSlice.actions;

export default appSlice.reducer;
