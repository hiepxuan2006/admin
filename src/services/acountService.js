import httpRequest from 'utils/httpRequest';

const acountService = {
   login: (data) => {
      const url = 'acount/login';
      return httpRequest.post(url, data);
   },
   checkLogin: () => {
      const url = 'acount';
      return httpRequest.get(url);
   },
};
export default acountService;
