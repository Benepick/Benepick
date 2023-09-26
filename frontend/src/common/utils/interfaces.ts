import { AppDispatch } from '@store/store';

export interface shakePickPushAlertParams {
  location: {
    latitude: number;
    longitude: number;
  };
  dispatch: () => AppDispatch;
}
