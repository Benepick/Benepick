import { http } from './http';

export default {
  get: (isSignUp: number) =>
    http.get<CardCompanyGetResponse>(`api/card-company?isSignUp=${isSignUp}`),
  post: (cardCompanyIdList: number[]) => http.post('api/card-company', { cardCompanyIdList }),
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
  linked: boolean;
  selected: boolean;
}

export interface CardCompanyIdListRequest {
  cardCompanyIdList: number[];
}
