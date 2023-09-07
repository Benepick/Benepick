import { http } from './http';

export default {
  login: (userSimplePassword: string) =>
    http.post<LoginResponce>('/api/user/login', { userSimplePassword }),
};

interface LoginResponce {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
}
