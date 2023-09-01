import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

const RootReducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
