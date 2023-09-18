import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import appReducer from './slices/appSlice';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';

const RootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
});

type ReducerState = ReturnType<typeof RootReducer>;

const persistConfig: PersistConfig<ReducerState> = {
  key: 'root',
  storage: EncryptedStorage,
  whitelist: ['user', 'app'],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
