import PushNotification, { Importance } from 'react-native-push-notification';
import { PushAlertParams } from './interfaces';

const PushAlert = ({ channelId, message }: PushAlertParams) => {
  PushNotification.localNotification({
    message: message,
    channelId: channelId,
  });
};

export default PushAlert;
