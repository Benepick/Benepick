import { http } from './http';

export default {
  place: ({ x, y }: placeRequest) => http.get<PlaceResponse>(`api/card/place?x=${x}&y=${y}`),
};

interface CommonResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
}

interface placeRequest {
  x: number;
  y: number;
}

export interface PlaceResponse {
  merchantName: string;
  cardName: string;
  cardCompanyName: string;
  cardImgUrl: string;
  serialNumber: string;
  discountTarget: string;
  discountPercent: number;
  remainLimitBenefit: number;
  recommend: boolean;
}
