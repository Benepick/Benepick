import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { persistor, store } from '@store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Loading from '@pages/Loading/Loading';

function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

export default Root;
