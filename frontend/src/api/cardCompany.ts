import { http } from './http';

export default {
  get: (isSignUp: number) =>
    http.get<CardCompanyGetResponse>(`api/card-company?isSignUp=${isSignUp}`),
  post: (cardCompanyIdList: number[]) =>
    http.post<CardCompanyCommonResponse>('api/card-company', { cardCompanyIdList }),
  delete: (cardCompanyId: number) =>
    http.delete<CardCompanyCommonResponse>(`api/card-company/${cardCompanyId}`),
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

export interface CardCompanyCommonResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
}
