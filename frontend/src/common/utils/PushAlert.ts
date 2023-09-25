import PushNotification from 'react-native-push-notification';
import { shakePickPushAlertParams } from './interfaces';
import card from '@api/card';

const randomTitle = (recommend: boolean, title: string) => {
  const index = 3;
  const random = Math.floor(Math.random() * index);

  if (recommend) {
    if (random === 0) {
      return `혹시 ${title}에 계신가요?`;
    } else if (random === 1) {
      return `${title}에 계시는군요`;
    } else if (random === 2) {
      return `${title}에서 결제 예정이신가요?`;
    } else {
      return '';
    }
  } else {
    return `아쉽지만 ${title}에서 혜택이 적용되는 카드가 없어요`;
  }
};

const randomContext = (recommend: boolean, company: string, card: string) => {
  const index = 4;
  const random = Math.floor(Math.random() * index);

  if (recommend) {
    if (random === 0) {
      return `${company} ${card}가 가장 유리해요!`;
    } else if (random === 1) {
      return `${company} ${card} 추천드려요!`;
    } else if (random === 2) {
      return `${company} ${card} 사용하는게 가장 좋아요!`;
    } else if (random === 3) {
      return `${company} ${card} 사용하시면 혜택을 받아요!`;
    } else {
      return '';
    }
  } else {
    return `대신 ${company} ${card}의 실적을 쌓아두시는게 어떨까요?`;
  }
};

const shakePickPushAlert = ({ location }: shakePickPushAlertParams) => {
  card.place({ x: location.longitude, y: location.latitude }).then((response) => {
    PushNotification.localNotification({
      channelId: 'shakePick',
      showWhen: true,
      title: randomTitle(response.recommend, response.merchantName),
      message: randomContext(response.recommend, response.cardCompanyName, response.cardName),
      subText: `${location.latitude}, ${location.longitude}`,
      largeIcon: '',
    });
  });

  // PushNotification.localNotification({
  //   channelId: 'shakePick',
  //   showWhen: true,
  //   message: randomContext(`${location.latitude}`, `${location.longitude}`),
  //   subText: `${location.latitude}, ${location.longitude}`,
  //   largeIcon: '',
  // });
};

export default shakePickPushAlert;
