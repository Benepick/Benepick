import Axios from 'axios';

export const ROOT = 'http://192.168.137.69:8080/';

const httpAxios = Axios.create({
  baseURL: ROOT,
});

// 토큰을 받아옴
// 현재는 김싸피 토큰임
const getToken = () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhY2Nlc3MtdG9rZW4iLCJpYXQiOjE2OTQ2NTI3MDAsImV4cCI6MTc1NTEzMjcwMCwidXNlcklkIjoiMDAyM2QwYjc2NDAxYzQ4NGMxMjNlOWRjYzYwMzQ5M2Y2ODdmZTRkZjhlOTY1MjFlOGU1MWFhMmVmZDNmZGEwZSJ9.FOVWaHgmS8QjEJYEHzn0rSTZNRsx3MX57VSql2PHWRs';
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
  get: <Response = unknown>(url: string) =>
    httpAxios.get<Response>(url).then((response) => response.data),
  post: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.post<Response>(url, body).then((response) => response.data),
  put: <Response = unknown, Request = unknown>(url: string, body?: Request) =>
    httpAxios.put<Response>(url, body).then((response) => response.data),
  delete: <Response = unknown>(url: string) =>
    httpAxios.delete<Response>(url).then((response) => response.data),
};
