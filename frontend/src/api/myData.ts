import { CommonResponse, http } from './http';

export default {
  recent: () => http.get<RecentResponse>('api/mydata/card/payment/recent'),
  payment: () => http.get<PaymentResponse>('api/mydata/card/payment'),
  cardList: () => http.get('api/mydata/payment'),
  cardDetail: ({ cardId, year, month }: CardDetailRequest) =>
    http.get<CardDetailResponse>(`api/mydata/card/payment/${cardId}?year=${year}&month=${month}`),
};

interface RecentResponse extends CommonResponse {
  data: RecentData[];
}

export interface RecentData {
  year: number;
  month: string;
  payAmount: number;
  benefitAmount: number;
  benefitRate: number;
}

interface PaymentResponse extends CommonResponse {
  data: PaymentData;
}

export interface PaymentData {
  payAmount: number;
  benefitAmount: number;
  imgUrl: string;
  benefitRate: number;
}

interface CardDetailRequest {
  cardId: number;
  year: number;
  month: number;
}

interface CardDetailResponse extends CommonResponse {
  data: {
    totalAmount: number;
    categoryResultResponseDtoList: CategoryResultResponseDto[];
  };
}

interface CategoryResultResponseDto {
  categoryName: string;
  amount: number;
  amountRate: number;
}
