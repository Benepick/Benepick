import React from 'react';
import RootStack from './src/navigator/RootStack';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { globalStyles } from '@common/design/globalStyles';
import { View } from 'react-native';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <View style={globalStyles.container}>
        <RootStack />
      </View>
    </Provider>
  );
}

export default App;
