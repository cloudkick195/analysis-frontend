import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { getCookie, hasCookie } from "cookies-next";

const siteId = process.env.SITE_ID as string;
const AUTH_KEY = process.env.AUTH_KEY as string;

const api = axios.create({
  baseURL: process.env.UTIL_URL,
});

api.interceptors.request.use(
  (config: any) => {
    const token = hasCookie(AUTH_KEY);
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      SiteId: siteId
    };
    if (token) {
      const profile = JSON.parse(getCookie(AUTH_KEY as string) as string)
      config.headers = {
        ...config.headers,
        'Authorization': `bearer ${profile.token}`
      };
    }
    return config;
  },
  (error: AxiosError) => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.status >= 400) {
      return Promise.reject({ response });
    }
    return response;
  },
  (err: AxiosError) => {
    console.log('Axios Error: ', err)
    return Promise.reject(err);
  },
);

export default api;
