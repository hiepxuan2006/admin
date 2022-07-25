import httpRequest from './httpRequest';

const deleteServecies = {
   del: (baseUrl, params) => {
      const url = `${baseUrl}/del`;
      return httpRequest.delete(url, { params });
   },
};
export default deleteServecies;
