import React, { useEffect } from 'react';
import { NativeEventEmitter, NativeModules, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import RootStack from './src/navigator/RootStack';
import store from './src/store/store';
import PushNotification, { Importance } from 'react-native-push-notification';
import PushAlert from '@common/utils/PushAlert';

function App(): JSX.Element {
  const { EventListener } = NativeModules;

  useEffect(() => {
    EventListener.startListeningInBackground();

    PushNotification.createChannel(
      {
        channelId: 'shakePick', // (required)
        channelName: '흔들어서 카드 추천 받기', // (required)
        channelDescription: 'Channel to notificate shakePick', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, []);

  const eventListener = new NativeEventEmitter(EventListener);

  eventListener.addListener('onTrigger', (trigger) => {
    PushAlert({
      channelId: 'shakePick',
      message: '흔들림 감지',
    });
  });

  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}

export default App;
