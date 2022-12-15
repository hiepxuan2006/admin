import axios from 'axios';
import queryString from 'query-string';
const httpRequest = axios.create({
    // baseURL: 'http://localhost:8080/api/admin/',
    baseURL: 'https://hx-farm.herokuapp.com/api/admin/',

    paramsSerializer: (params) => queryString.stringify(params),
});
export const setAuthToken = (token) => {
   if (token) {
      httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   } else {
      delete httpRequest.defaults.headers.common['Authorization'];
   }
};
httpRequest.interceptors.request.use(async (config) => {
   return config;
});
httpRequest.interceptors.response.use(
   (response) => {
      if (response && response.data) {
         return response.data;
      }
      return response;
   },
   (error) => {
      throw error;
   },
);
export default httpRequest;
