import React, { useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { Provider } from 'react-redux';
import RootStack from './src/navigator/RootStack';
import store from './src/store/store';

function App(): JSX.Element {
  const { EventListener } = NativeModules;

  useEffect(() => {
    EventListener.startListeningInBackground();
  }, []);

  const eventListener = new NativeEventEmitter(EventListener);

  eventListener.addListener('onTrigger', (trigger) => {
    console.log(trigger);
  });

  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}

export default App;
