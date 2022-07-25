import httpRequest from 'utils/httpRequest';

const orderService = {
   getAllOrder: () => {
      const url = 'order';
      return httpRequest.get(url);
   },
   getOneOrder: (id) => {
      const url = `order/get-one/${id}`;
      return httpRequest.get(url);
   },
   updateStatus: (params) => {
      const url = 'order/update';
      return httpRequest.post(url, params);
   },
};
export default orderService;
