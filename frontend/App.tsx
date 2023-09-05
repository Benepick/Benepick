import React from 'react';
import RootStack from './src/navigator/RootStack';
import { Provider } from 'react-redux';
import store from './src/store/store';

import { View } from 'react-native';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}

export default App;
