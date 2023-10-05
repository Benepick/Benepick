import { CommonResponse, http } from './http';
import { CardCompanyGetResponse } from './cardCompany';

export default {
  login: (userSimplePassword: string) =>
    http.post<CommonResponse>('api/user/login', { userSimplePassword }),
  phone: (phoneNumber: string) =>
    http.post<PhoneResponse>('api/user/phone', { phoneNumber: phoneNumber }),
  signup: (userData: SignupRequest) => http.token<SignupResponse>('api/user/signup', userData),
  password: (userSimplePassword: string) =>
    http.post<CommonResponse>('api/user/password', { userSimplePassword }),
  cardCompany: () => http.get<CardCompanyGetResponse>('api/user/card-company'),
  withdrawal: () => http.delete<CommonResponse>('api/user'),
  ci: (checkMyData: CiRequest) => http.post<CiResponse>('api/user/ci', checkMyData),
};

interface SignupResponse extends CommonResponse {
  data: string;
}

interface PhoneResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
  data: string;
}

interface SignupRequest {
  userName: string;
  userSocialNumber: string;
  userPhoneNumber: string;
  userGenderAndGenerationCode: string;
  userSimplePassword: string;
}

interface CiRequest {
  userName: string;
  userSocialNumber: string;
  userPhoneNumber: string;
  userGenderAndGenerationCode: string;
}

interface CiResponse extends CommonResponse {
  data: boolean;
}
