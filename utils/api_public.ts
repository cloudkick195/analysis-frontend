import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useDispatch } from 'react-redux';

const siteId = process.env.SITE_ID as string;
const AUTH_KEY = process.env.AUTH_KEY as string;

const api = axios.create({
  baseURL: process.env.BASE_API_URL_PUBLIC,
});

api.interceptors.request.use(
  (config: any) => {
   
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json"
    };
    
    for (const key in config.params) {
      if(!config.params[key]){
        config.params[key] = undefined
      }
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
      if (response.data.status === 401) deleteCookie(AUTH_KEY);
      return Promise.reject({ response });
    }
    

    return response;
  },
  (err: AxiosError) => {
    console.log('Axios Error: ', err)
    if (err.response?.status === 401) deleteCookie(AUTH_KEY);
    return Promise.reject(err);
  },
);

export default api;
