import { store } from '@store/store';
import Axios from 'axios';

export const ROOT = 'http://192.168.137.199:8080/';

const httpAxios = Axios.create({
  baseURL: ROOT,
});

// 토큰이 있을 때 httpAxios에 토큰을 집어넣는 로직
httpAxios.interceptors.request.use((config) => {
  // Request URL 보는법
  // console.log(config.url);
  const newConfig = { ...config };
  const token = store.getState().user.token;
  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }
  return newConfig;
});

export const http = {
  get: <Response = unknown>(url: string) =>
    httpAxios.get<Response>(url).then((response) => response.data),
  post: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.post<Response>(url, body).then((response) => response.data),
  put: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.put<Response>(url, body).then((response) => response.data),
  delete: <Response = unknown>(url: string) =>
    httpAxios.delete<Response>(url).then((response) => response.data),
  token: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.post<Response>(url, body).then((response) => response),
};

export interface CommonResponse {
  statusCode: number;
  messages: string;
  developerMessage: string;
  timestamp: string;
}
