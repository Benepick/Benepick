import { CommonResponse, http } from './http';

export default {
  benefitUser: (keyword: string) =>
    http.get<BenefitUserResponse>(`api/card/benefit/user/${keyword}`),
  benefitAll: (keyword: string) => http.get<BenefitAllResponse>(`api/card/benefit/all/${keyword}`),
};

// 가맹점 기반 내 카드 혜택 검색
export interface BenefitUserResponse extends CommonResponse {
  data: BefitUserCard[];
}

export interface BefitUserCard {
  cardCompanyName: string;
  cardName: string;
  cardImgUrl: string;
  category: string;
  discountPercent: number;
  discountTarget: string;
  remainedBenefit: number;
}

// 가맹점 기반 전체 카드 혜택 검색
export interface BenefitAllResponse extends CommonResponse {
  data: BefitAllCard[];
}

export interface BefitAllCard {
  cardCompanyName: string;
  cardName: string;
  cardImgUrl: string;
  category: string;
  discountPercent: number;
  discountTarget: string;
  benefitLimit: number;
}
