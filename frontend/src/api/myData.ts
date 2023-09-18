import { http } from './http';

export default {
  recent: () => http.get<RecentResponse>('api/mydata/card/payment/recent'),
};

interface CommonResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
}

interface RecentResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
  data: RecentData[];
}

export interface RecentData {
  year: number;
  month: string;
  payAmount: number;
  benefitAmount: number;
  benefitRate: number;
}
