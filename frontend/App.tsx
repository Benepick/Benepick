import React from 'react';
import RootStack from './src/router/RootStack';
import { Provider } from 'react-redux';
import store from './src/store/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}

export default App;
