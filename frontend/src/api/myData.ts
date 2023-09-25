import { CommonResponse, http } from './http';

export default {
  recent: () => http.get<RecentResponse>('api/mydata/card/payment/recent'),
  payment: () => http.get<PaymentResponse>('api/mydata/card/payment'),
  cardList: () => http.get<CardListResponse>('api/user/card'),
  cardDetail: ({ cardId, year, month }: CardDetailRequest) =>
    http.get<CardDetailResponse>(`api/mydata/card/payment/${cardId}?year=${year}&month=${month}`),
  category: () => http.get<CardCategoryResponse>('api/mydata/card/payment/category'),
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

interface CardListResponse extends CommonResponse {
  data: CardListData[];
}

export interface CardListData {
  cardCode: number;
  cardName: string;
  expirationDate?: string;
  cardCompanyName: string;
  cardImgUrl: string;
  serialNumber: string;
  currentPerformance: number;
  performanceLevels: number[];
  currentLevel: number;
  nextLevelAmount: number;
}

export interface CardDetailRequest {
  cardId: number;
  year: number;
  month: number;
}

// 카드 상세보기
interface CardDetailResponse extends CommonResponse {
  data: CardDetailData;
}

export interface CardDetailData {
  cardCompanyName: string;
  cardName: string;
  cardImgUrl: string;
  totalAmount: number;
  totalBenefit: number;
  dayTransactionResponseDtoList: DayTransactionResponseDto[];
}

export interface DayTransactionResponseDto {
  transactionDate: string;
  transcationInfoResponseDtoList: TransactionInfoResponseDto[];
}

export interface TransactionInfoResponseDto {
  category: '생활' | '쇼핑' | '식비' | '여가' | '편의점' | '카페/간식' | '온라인';
  merchantName: string;
  payAmount: number;
  benefitAmount: number;
  transactionTime: string;
}

// 이번달 카테고리 별 전체 소비 금액 조회
interface CardCategoryResponse extends CommonResponse {
  data: {
    totalAmount: number;
    categoryResultResponseDtoList: CategoryResultResponseDto[];
  };
}

export interface CategoryResultResponseDto {
  categoryName: '생활' | '쇼핑' | '식비' | '여가' | '편의점' | '카페' | '온라인';
  amount: number;
  amountRate: number;
}
