import Axios from 'axios';

export const ROOT = 'http://10.0.2.2:8080';

const httpAxios = Axios.create({
  baseURL: ROOT,
});

// 토큰을 받아옴
// 현재는 김싸피 토큰임
const getToken = () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE2OTM5Nzk0NDIsImV4cCI6MTc1NDQ1OTQ0MiwidXNlcklkIjoiZjJhNWI1N2MyOTJhNDkzNzRmMWZhNTAyNjJjNzY2NjdmYjRhYWNlYzNlZGQ2YzlmNDJhYmZiZWU1OGVkZjlmNyJ9.zuh5QQPIRjl9W7JXdmdOWa-YcRDQ5jCzT706dKk8KyQ';
};

// 토큰이 있을 때 httpAxios에 토큰을 집어넣는 로직
httpAxios.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const token = getToken();
  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }
  return newConfig;
});

export const http = {
  get: <Response = unknown>(url: string) => httpAxios.get<Response>(url).then((res) => res.data),
  post: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.post<Response>(url, body).then((res) => res.data),
  put: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.put<Response>(url, body).then((res) => res.data),
  delete: <Response = unknown>(url: string) =>
    httpAxios.delete<Response>(url).then((res) => res.data),
};
