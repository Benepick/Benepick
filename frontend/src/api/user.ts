import { http } from './http';

export default {
  login: (userSimplePassword: string) =>
    http.post<LoginResponse>('/api/user/login', { userSimplePassword }),
};

interface LoginResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
}
