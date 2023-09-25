import React, { useEffect } from 'react';
import { Alert, NativeEventEmitter, NativeModules } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';

import { setShakePick, setLaunch } from '@store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import RootStack from './src/navigator/RootStack';
import shakePickPushAlert from '@common/utils/PushAlert';

function App() {
  const { EventListener } = NativeModules;

  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (app.shakePick) {
      EventListener.startShakePick();
    } else {
      EventListener.stopShakePick();
    }
  }, [app.shakePick]);

  useEffect(() => {
    const isFirstLaunch = app.isFirstLaunched;
    if (isFirstLaunch) {
      dispatch(setLaunch());
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
      Alert.alert(
        '권한 설정',
        '베네픽 서비스를 사용하기 위해서는 알림 및 위치 정보 권한 설정이 필요해요',
        [
          {
            text: '허용 안함',
            onPress: () => console.log('허용하지 않음'),
            style: 'cancel',
          },
          {
            text: '허용',
            onPress: () => {
              dispatch(setShakePick());
            },
            style: 'default',
          },
        ],
      );
    }

    const eventListener = new NativeEventEmitter(EventListener);
    eventListener.addListener('onTrigger', (location) => {
      console.log(location);
      shakePickPushAlert({
        location: location,
      });
    });

    return () => {
      eventListener.removeAllListeners('onTrigger');
    };
  }, []);

  return <RootStack />;
}

export default App;
