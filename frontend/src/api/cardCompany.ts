import { http } from './http';

export default {
  get: () => http.get<CardCompanyGetResponse>('api/card-company'),
};

export interface CardCompanyGetResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
  data: CardCompany[];
}

export interface CardCompany {
  cardCompanyId: number;
  cardCompanyName: string;
  cardCompanyImgUrl: string;
}
